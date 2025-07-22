"use client";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Component } from "lucide-react";

export const Examples = () => {
  return (
    <section id="examples" className="py-20 md:py-32 w-full container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col justify-center items-center space-y-3 mb-12 text-center"
      >
        <div className="flex justify-center items-center gap-3 mb-3">
          <Badge
            className="mb-3 px-3 py-1 rounded-full font-semibold text-sm transition-none"
            variant="secondary"
          >
            <Component className="mr-2 size-4 text-primary" />
            Examples
          </Badge>
        </div>
        <p className="bg-clip-text bg-gradient-to-r from-foreground to-foreground/80 font-bold text-transparent text-3xl md:text-4xl tracking-tight">
          Quickly build up your application
        </p>
        <p className="max-w-[800px] text-muted-foreground md:text-lg">
          Explore a collection of ready-to-use components and layouts that suit
          most practical needs.
        </p>
      </motion.div>
    </section>
  );
};
