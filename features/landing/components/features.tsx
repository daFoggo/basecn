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
        className="flex flex-col justify-center items-center space-y-4 mb-12 text-center"
      >
        <div className="flex justify-center items-center gap-4 mb-4">
          <Badge
            className="shadow-sm px-4 py-1.5 rounded-full font-medium text-sm"
            variant="secondary"
          >
            <span className="mr-1 text-primary">
              <Code className="size-4" />
            </span>{" "}
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
          <Button size="lg" className="z-20 relative pointer-events-auto">
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
      <Card className="hover:shadow-lg hover:shadow-primary/10 backdrop-blur-xl p-0 border hover:border-primary/100 border-border/70 rounded-none h-full overflow-hidden transition-all duration-300 cursor-pointer">
        <div className="relative p-4 h-full">
          <div className="-top-10 -right-10 absolute bg-gradient-to-b from-primary/20 to-primary/5 opacity-80 blur-3xl w-32 h-32 pointer-events-none" />
          <div className="z-10 relative">
            <div className="flex justify-center items-center bg-gradient-to-br from-primary/10 to-primary/5 mb-4 w-12 h-12 text-primary">
              {feature.icon}
            </div>
            <h3 className="mb-2 font-semibold text-xl">{feature.name}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
