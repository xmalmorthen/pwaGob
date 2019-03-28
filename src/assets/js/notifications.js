const notification = {
  notificarme: () => {
    if (!window.Notification) return false;

    if (Notification.permission === "granted") {
      new Notification("Hola Mundo! - granted");
    } else if (
      Notification.permission !== "denied" ||
      Notification.permission === "default"
    ) {
      Notification.requestPermission(permission => {
        if (permission === "granted") {
          new Notification("Hola Mundo! - pregunta");
        }
      });
    }
  }
};

notification.notificarme();
