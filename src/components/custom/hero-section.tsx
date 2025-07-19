"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Upload, Shield, Zap } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-rose-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-rose-100 text-rose-800 text-sm font-medium mb-8">
              <Zap className="w-4 h-4 mr-2" />
              15GB Free Storage + Premium Features
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
          >
            Your Files,{" "}
            <span className="text-gradient">Everywhere</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Store, sync, and share your documents, photos, videos, and more. 
            Access your files from any device, anywhere in the world.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link href="/sign-up">
              <Button size="lg" className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 text-lg group">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            {/* <Button 
              size="lg" 
              variant="outline" 
              className="border-rose-200 text-rose-600 hover:bg-rose-50 px-8 py-4 text-lg group"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button> */}
          </motion.div>

          {/* Feature highlights */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center space-x-3 bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-rose-100">
              <Upload className="h-8 w-8 text-rose-500" />
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">Easy Upload</h3>
                <p className="text-gray-600 text-sm">Drag & drop files instantly</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-3 bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-rose-100">
              <Shield className="h-8 w-8 text-rose-500" />
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">Secure Storage</h3>
                <p className="text-gray-600 text-sm">Enterprise-grade security</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-3 bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-rose-100">
              <Zap className="h-8 w-8 text-rose-500" />
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">Lightning Fast</h3>
                <p className="text-gray-600 text-sm">Instant sync across devices</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}