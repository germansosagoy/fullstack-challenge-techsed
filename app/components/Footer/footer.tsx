import { dataFooter } from "@/app/data/footer/footer-data";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <p className="lg:text-xs text-gray-500">
            <span>Copyright</span>
            <span className="block sm:inline">
              {" "}
              &copy;{new Date().getFullYear()}
              {" "}
              Tech-Sed. 
            </span>
              {" "}
             Todos los derechos reservados.
          </p>
          <ul>
            {dataFooter.map((item) => (
              <li key={item.id}>
                <Link href={item.link} className="md-4 hover:underline md:me-6">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
