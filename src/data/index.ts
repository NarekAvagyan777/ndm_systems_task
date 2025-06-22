import type { Route } from "../types";

export const routes: Route[] = [
  {
    uuid: "1",
    address: "0.0.0.0",
    mask: "/0",
    gateway: "193.0.174.1",
    interface: "Подключение Ethernet",
  },
  {
    uuid: "2",
    address: "10.1.30.0",
    mask: "/24",
    gateway: "0.0.0.0",
    interface: "Гостевая сеть",
  },
  {
    uuid: "3",
    address: "192.168.1.0",
    mask: "/24",
    gateway: "0.0.0.0",
    interface: "Домашняя сеть",
  },
  {
    uuid: "4",
    address: "193.0.174.0",
    mask: "/24",
    gateway: "0.0.0.0",
    interface: "Подключение Ethernet",
  },
  {
    uuid: "5",
    address: "193.0.175.0",
    mask: "/25",
    gateway: "193.0.174.10",
    interface: "Подключение Ethernet",
  },
  {
    uuid: "6",
    address: "193.0.175.22",
    mask: "/32",
    gateway: "193.0.174.1",
    interface: "Подключение Ethernet",
  },
];
