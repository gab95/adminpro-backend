exports.getMenuFrontend = (role = "user_role") => {
  const menu = [
    {
      titulo: "Dashboard",
      icono: "mdi mdi-gauge",
      submenu: [
        { titulo: "Main", url: "/" },
        { titulo: "Progress Bar", url: "progress" },
        { titulo: "Gráficas", url: "grafica1" },
        { titulo: "Promesas", url: "promesas" },
        { titulo: "RxJS", url: "rxjs" },
      ],
    },

    {
      titulo: "Mantenimiento",
      icono: "mdi mdi-folder-lock-open",
      submenu: [
        // { titulo: 'Usuarios', url: 'usuarios' },
        { titulo: "Hospitales", url: "hospitales" },
        { titulo: "Médicos", url: "medicos" },
      ],
    },
  ];

  if (role === "admin_role") {
    menu[1].submenu.unshift({ titulo: "Usuarios", url: "usuarios" });
  }

  return menu;
};
