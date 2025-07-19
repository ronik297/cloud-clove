"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, Cloud, Link as LinkIcon } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-rose-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Cloud className="h-8 w-8 text-rose-500" />
            <span className="text-xl font-bold text-gradient">CloudDrive</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-rose-500 transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-rose-500 transition-colors">
              Pricing
            </a>
            <a href="#about" className="text-gray-700 hover:text-rose-500 transition-colors">
              About
            </a>
            <Link href="/sign-in">
                <Button variant="outline" className="border-rose-200 text-rose-600 hover:bg-rose-50 cursor-pointer">
                    <LinkIcon className="h-8 w-8"  />
                    Sign In
                </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 space-y-4"
          >
            <a href="#features" className="block text-gray-700 hover:text-rose-500 transition-colors">
              Features
            </a>
            <a href="#pricing" className="block text-gray-700 hover:text-rose-500 transition-colors">
              Pricing
            </a>
            <a href="#about" className="block text-gray-700 hover:text-rose-500 transition-colors">
              About
            </a>
            <div className="flex flex-col space-y-2">
              <Button variant="outline" className="border-rose-200 text-rose-600 hover:bg-rose-50">
                Sign In
              </Button>
              <Button className="bg-rose-500 hover:bg-rose-600 text-white">
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}