import { ArrowRight } from "lucide-react";
import Link from "next/link";
import SplitText from "@/components/decoration/split-text";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/configs/site";
import { HeroImage } from "./hero-image";

export const Hero = () => {
  return (
    <section className="relative flex flex-col items-center justify-center pt-16 lg:pt-24 pb-8 lg:pb-16 overflow-hidden">
      <div className="relative z-10 flex flex-col items-center gap-8 text-center px-6 max-w-5xl mx-auto">
        <div className="flex flex-col items-center gap-4">
          <div className="max-w-4xl">
            <SplitText
              text="Everything we need"
              className="text-4xl font-medium tracking-tight sm:text-6xl "
              delay={50}
              duration={1.25}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              textAlign="center"
            />
            <SplitText
              text="is already here."
              className="text-4xl font-medium tracking-tight sm:text-6xl "
              delay={150}
              duration={1.25}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              textAlign="center"
            />
          </div>

          <p className="max-w-2xl text-md text-muted-foreground sm:text-lg">
            {SITE_CONFIG.metadata.description}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="lg">
            Learn more
          </Button>
          <Link href="/acme-inc">
            <Button size="lg">
              Start experience
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="w-full">
        <HeroImage />
      </div>
    </section>
  );
};
