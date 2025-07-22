"use client";

import { motion } from "framer-motion";
import { Cloud, Mail, Phone, MapPin, Twitter, Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <Cloud className="h-8 w-8 text-rose-500" />
              <span className="text-xl font-bold">CloudClove</span>
            </div>
            <p className="text-gray-400 max-w-xs">
              Your secure cloud storage solution. Store, sync, and share files with ease.
            </p>
            <div className="flex space-x-4">
              <Twitter className="h-5 w-5 text-gray-400 hover:text-rose-500 cursor-pointer transition-colors" />
              <Facebook className="h-5 w-5 text-gray-400 hover:text-rose-500 cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-rose-500 cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-rose-500 cursor-pointer transition-colors" />
            </div>
          </motion.div>

          {/* Product */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-rose-500 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-rose-500 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-rose-500 transition-colors">Storage Plans</a></li>
              <li><a href="#" className="hover:text-rose-500 transition-colors">Mobile Apps</a></li>
              <li><a href="#" className="hover:text-rose-500 transition-colors">Integrations</a></li>
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-rose-500 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-rose-500 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-rose-500 transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-rose-500 transition-colors">Status Page</a></li>
              <li><a href="#" className="hover:text-rose-500 transition-colors">Contact Us</a></li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-rose-500" />
                <span>support@Cloudclove.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-rose-500" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-rose-500" />
                <span>San Francisco, CA</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-400 text-sm">
            © 2025 CloudClove. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-rose-500 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-rose-500 text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-rose-500 text-sm transition-colors">
              Cookie Policy
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}