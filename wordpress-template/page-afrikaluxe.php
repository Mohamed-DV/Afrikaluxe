<?php

 $wpApi = trailingslashit(site_url()) . "wp-json/afrikaluxe/v1/lead";
 $iframeSrc = add_query_arg(
   array(
     "wp_api" => $wpApi,
   ),
   "https://afrikaluxe.netlify.app/"
 );
?><!doctype html>
<html <?php language_attributes(); ?>>
  <head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
    <style>
      html, body {
        margin: 0 !important;
        padding: 0 !important;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: #050505;
      }

      .afrikaluxe-template-shell {
        width: 100%;
        height: 100dvh;
        background: #050505;
      }

      .afrikaluxe-template-shell iframe {
        width: 100%;
        height: 100%;
        border: 0;
        display: block;
        background: #050505;
      }
    </style>
  </head>
  <body <?php body_class('afrikaluxe-embed-template'); ?>>
    <?php wp_body_open(); ?>
    <main class="afrikaluxe-template-shell">
      <iframe
        src="<?php echo esc_url($iframeSrc); ?>"
        title="<?php echo esc_attr('AfrikaLuxe Landing'); ?>"
        loading="eager"
        referrerpolicy="no-referrer-when-downgrade"
        allowfullscreen>
      </iframe>
    </main>
    <?php wp_footer(); ?>
  </body>
</html>
