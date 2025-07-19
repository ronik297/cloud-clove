"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { 
  FileText, 
  Image, 
  FileVideo, 
  Download, 
  Share2, 
  Smartphone, 
  Users, 
  Lock,
  Folder,
  Search,
  Zap,
  CreditCard
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "All File Types",
    description: "Support for documents, PDFs, spreadsheets, presentations, and more. Upload any file format with ease.",
    color: "text-blue-500",
    bgColor: "bg-blue-50"
  },
  {
    icon: Image,
    title: "Photos & Videos",
    description: "Store high-quality photos and videos. Automatic photo backup from your mobile devices.",
    color: "text-green-500",
    bgColor: "bg-green-50"
  },
  {
    icon: Share2,
    title: "Easy Sharing",
    description: "Share files and folders with anyone. Set permissions and control access with granular settings.",
    color: "text-purple-500",
    bgColor: "bg-purple-50"
  },
  {
    icon: Smartphone,
    title: "Mobile Access",
    description: "Access your files on any device. Native mobile apps for iOS and Android with offline support.",
    color: "text-orange-500",
    bgColor: "bg-orange-50"
  },
//   {
//     icon: Users,
//     title: "Collaboration",
//     description: "Real-time collaboration on documents. Comment, edit, and work together seamlessly.",
//     color: "text-rose-500",
//     bgColor: "bg-rose-50"
//   },
//   {
//     icon: Lock,
//     title: "Enterprise Security",
//     description: "Bank-level encryption and security. Your data is protected with advanced security measures.",
//     color: "text-red-500",
//     bgColor: "bg-red-50"
//   },
//   {
//     icon: Search,
//     title: "Smart Search",
//     description: "Find any file instantly with powerful search. AI-powered content recognition and indexing.",
//     color: "text-indigo-500",
//     bgColor: "bg-indigo-50"
//   },
//   {
//     icon: CreditCard,
//     title: "Flexible Storage",
//     description: "Start with 15GB free. Upgrade seamlessly with Paddle payments for unlimited storage options.",
//     color: "text-emerald-500",
//     bgColor: "bg-emerald-50"
//   }
];

export default function FeaturesSection() {
  return (
    <section  className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="features">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-rose-100 text-rose-800 text-sm font-medium mb-8">
            <Zap className="w-4 h-4 mr-2" />
            Powerful Features
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything you need to manage your files
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From simple file storage to advanced collaboration tools, we've got you covered with enterprise-grade features.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:border-rose-200">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Storage plans */}
         <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-8">Choose Your Storage Plan</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-2 border-gray-200 hover:border-rose-300 transition-colors">
              <CardContent className="p-8">
                <div className="text-center">
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">Free</h4>
                  <p className="text-4xl font-bold text-rose-500 mb-4">15GB</p>
                  <p className="text-gray-600 mb-6">Perfect for personal use</p>
                  <ul className="text-left space-y-2 text-gray-600">
                    <li>✓ 15GB storage</li>
                    <li>✓ Basic file sharing</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-rose-300 bg-rose-50 relative hover:border-rose-400 transition-colors">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-rose-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Pay as you grow
                </span>
              </div>
              <CardContent className="p-8">
                <div className="text-center">
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">Additional Storage</h4>
                  <p className="text-4xl font-bold text-rose-500 mb-1">$0.75</p>
                  <p className="text-lg text-gray-500 mb-4">per GB</p>
                  <p className="text-gray-600 mb-6">Scale as you need</p>
                  <ul className="text-left space-y-2 text-gray-600">
                    <li>✓ Pay only for what you use</li>
                    <li>✓ Instant storage upgrade</li>
                    <li>✓ Secure Paddle payments</li>
                    <li>✓ Cancel anytime</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
}