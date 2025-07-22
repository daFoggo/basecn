"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, Code } from "lucide-react";
import Link from "next/link";
import { FEATURES } from "../utils/constants";
import type { IFeature } from "../utils/types";

export const Features = () => {
  return (
    <section id="features" className="py-20 md:py-32 w-full container">
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
            <Code className="mr-2 size-4 text-primary" />
            Features
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

      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-12">
        {FEATURES.map((feature, index) => (
          <motion.div
            key={feature.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <FeatureCard feature={feature} />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex justify-center mt-12"
        style={{ position: "relative", zIndex: 20 }}
      >
        <Link href="/docs" passHref>
          <Button size="lg" className="z-20 relative">
            Explore documentation
            <ArrowRight className="size-4" />
          </Button>
        </Link>
      </motion.div>
    </section>
  );
};

const FeatureCard = ({ feature }: { feature: IFeature }) => {
  return (
    <motion.div
      whileHover={{
        y: -5,
        transition: { duration: 0.2 },
      }}
      className="h-full"
    >
      <Card className="hover:shadow-primary p-0 hover:border-primary/100 h-full overflow-hidden transition-all cursor-pointer">
        <div className="relative p-3 h-full">
          <div className="-top-10 -right-10 absolute bg-gradient-to-b from-primary/20 to-primary/5 opacity-80 blur-3xl w-32 h-32 pointer-events-none" />
          <div className="z-10 relative">
            <div className="flex justify-center items-center bg-gradient-to-br from-primary/10 to-primary/5 mb-3 rounded-lg size-12 text-primary">
              {feature.icon}
            </div>
            <p className="mb-3 font-semibold text-xl">{feature.name}</p>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
