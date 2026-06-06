export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.afrikaluxe.app&hl=en";
export const APP_STORE_URL = "https://apps.apple.com/ci/app/afrikaluxe/id6759881499";
export const WEBSITE_URL = "https://afrikaluxe.com";

export const APP_INSTALL_REDIRECT_SCRIPT = `if (/android/i.test(navigator.userAgent)) {
  location.replace("${PLAY_STORE_URL}");
} else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
  location.replace("${APP_STORE_URL}");
} else {
  location.replace("${WEBSITE_URL}");
}`;
