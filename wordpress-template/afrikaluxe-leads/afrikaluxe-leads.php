<?php
/**
 * Plugin Name: AfrikaLuxe Leads
 * Description: Stores contact leads in WordPress and emails contact@afrikaluxe.com.
 * Version: 1.0.0
 * Author: AfrikaLuxe
 */

if (!defined("ABSPATH")) {
  exit;
}

const AFRIKALUXE_LEAD_EMAIL = "contact@afrikaluxe.com";

/**
 * Optional SMTP configuration loaded from wp-config.php constants.
 * This avoids storing secrets in plugin files.
 */
add_action("phpmailer_init", function ($phpmailer) {
  $phpmailer->isSMTP();
  $phpmailer->Host = defined("AFRIKALUXE_SMTP_HOST") ? AFRIKALUXE_SMTP_HOST : "mail.afrikaluxe.com";
  $phpmailer->Port = defined("AFRIKALUXE_SMTP_PORT") ? (int) AFRIKALUXE_SMTP_PORT : 465;
  $phpmailer->SMTPAuth = true;
  $phpmailer->Username = defined("AFRIKALUXE_SMTP_USER") ? AFRIKALUXE_SMTP_USER : AFRIKALUXE_LEAD_EMAIL;
  $phpmailer->Password = defined("AFRIKALUXE_SMTP_PASS") ? AFRIKALUXE_SMTP_PASS : "";
  $phpmailer->SMTPSecure = defined("AFRIKALUXE_SMTP_ENCRYPTION") ? AFRIKALUXE_SMTP_ENCRYPTION : "ssl";
  $phpmailer->From = AFRIKALUXE_LEAD_EMAIL;
  $phpmailer->FromName = "AfrikaLuxe";
});

add_action("init", function () {
  register_post_type("afrikaluxe_lead", array(
    "label" => "AfrikaLuxe Leads",
    "public" => false,
    "show_ui" => true,
    "show_in_menu" => true,
    "supports" => array("title"),
    "capability_type" => "post",
    "map_meta_cap" => true,
  ));
});

add_action("rest_api_init", function () {
  register_rest_route("afrikaluxe/v1", "/lead", array(
    "methods" => "OPTIONS",
    "permission_callback" => "__return_true",
    "callback" => function () {
      return new WP_REST_Response(null, 204);
    },
  ));

  register_rest_route("afrikaluxe/v1", "/lead", array(
    "methods" => WP_REST_Server::CREATABLE,
    "permission_callback" => "__return_true",
    "callback" => function (WP_REST_Request $request) {
      $name = sanitize_text_field((string) $request->get_param("name"));
      $email = sanitize_email((string) $request->get_param("email"));
      $phone = sanitize_text_field((string) $request->get_param("phone"));
      $subject = sanitize_text_field((string) $request->get_param("subject"));
      $message = sanitize_textarea_field((string) $request->get_param("message"));

      if ($name === "" || !is_email($email) || $phone === "" || $subject === "" || $message === "") {
        return new WP_REST_Response(array("ok" => false, "error" => "Invalid payload"), 400);
      }

      $postId = wp_insert_post(array(
        "post_type" => "afrikaluxe_lead",
        "post_status" => "publish",
        "post_title" => $subject . " - " . $name,
      ));

      if (is_wp_error($postId)) {
        return new WP_REST_Response(array("ok" => false, "error" => "Lead save failed"), 500);
      }

      update_post_meta($postId, "name", $name);
      update_post_meta($postId, "email", $email);
      update_post_meta($postId, "phone", $phone);
      update_post_meta($postId, "subject", $subject);
      update_post_meta($postId, "message", $message);

      $mailSubject = "[AfrikaLuxe] " . $subject;
      $mailBody = "Nom: {$name}\nEmail: {$email}\nTelephone: {$phone}\n\nMessage:\n{$message}";
      wp_mail(AFRIKALUXE_LEAD_EMAIL, $mailSubject, $mailBody);

      return new WP_REST_Response(array("ok" => true, "lead_id" => $postId), 201);
    },
  ));
});

add_filter("rest_pre_serve_request", function ($served, $result, $request) {
  if (strpos($request->get_route(), "/afrikaluxe/v1/lead") !== false) {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
  }
  return $served;
}, 10, 3);
