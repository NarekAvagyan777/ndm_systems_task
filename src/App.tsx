import { useState } from "react";
import "./App.css";
import type { Route } from "./types";
import { routes as initialRoutes } from "./data";

function ipToNumber(ip: string): number {
  return ip.split(".").reduce((acc, octet) => acc * 256 + Number(octet), 0);
}

function extractPureIP(ipWithMask: string): string {
  return ipWithMask.split("/")[0];
}

const App = () => {

  const [sortBy, setSortBy] = useState<
    "address" | "gateway" | "interface" | null
  >(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [sortedRoutes, setSortedRoutes] = useState<Route[]>(initialRoutes);

  const handleSort = (key: typeof sortBy) => {
    let direction: "asc" | "desc" = "asc";
    if (sortBy === key) {
      direction = sortDirection === "asc" ? "desc" : "asc";
    }

    let sorted: Route[] = [];
    
    if (key === "address" || key === "gateway") {
      sorted = [...sortedRoutes].sort((a, b) => {
        const ipA = key === "address" ? extractPureIP(a[key] + a.mask) : a[key];
        const ipB = key === "address" ? extractPureIP(b[key] + b.mask) : b[key];
        const diff = ipToNumber(ipA) - ipToNumber(ipB);
        return direction === "asc" ? diff : -diff;
      });
    } else if (key === "interface") {
      sorted = [...sortedRoutes].sort((a, b) => {
        const diff = a.interface.localeCompare(b.interface);
        return direction === "asc" ? diff : -diff;
      });
    }

    setSortedRoutes(sorted);
    setSortBy(key);
    setSortDirection(direction);
  };

  const renderSortArrow = (key: typeof sortBy) => {
    if (sortBy !== key) return null;
    return sortDirection === "asc" ? "▲" : "▼";
  };

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
        Действующие маршруты IPv4
      </h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th
                className="p-2 cursor-pointer hover:bg-blue-50 whitespace-nowrap"
                onClick={() => handleSort("address")}
              >
                Адрес назначения {renderSortArrow("address")}
              </th>
              <th
                className="p-2 cursor-pointer hover:bg-blue-50 whitespace-nowrap"
                onClick={() => handleSort("gateway")}
              >
                Шлюз {renderSortArrow("gateway")}
              </th>
              <th
                className="p-2 cursor-pointer hover:bg-blue-50 whitespace-nowrap"
                onClick={() => handleSort("interface")}
              >
                Интерфейс {renderSortArrow("interface")}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedRoutes.map((route) => (
              <tr key={route.uuid} className="border-t">
                <td className="p-2 whitespace-nowrap">{`${route.address}${route.mask}`}</td>
                <td className="p-2 whitespace-nowrap">{route.gateway}</td>
                <td className="p-2 whitespace-nowrap">{route.interface}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
