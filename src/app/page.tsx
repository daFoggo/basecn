import Link from "next/link";
import { ThemeSwitcher } from "@/components/common/theme-switcher";
import LightRays from "@/components/decoration/light-rays";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SITE_CONFIG } from "@/configs/site";

const RootPage = () => {
  const metadata = SITE_CONFIG.metadata;
  return (
    <div className="flex flex-col min-h-dvh items-center justify-center space-y-4 relative">
      <LightRays
        raysOrigin="top-center"
        raysColor="#1447e6"
        raysSpeed={1}
        lightSpread={0.5}
        rayLength={3}
        followMouse={true}
        mouseInfluence={0.1}
        noiseAmount={0}
        distortion={0}
        pulsating={false}
        fadeDistance={1}
        saturation={1}
        className="absolute inset-0 -z-10 opacity-50"
      />

      <Card className="max-w-md z-10 relative">
        <CardHeader>
          <CardTitle className="font-semibold">{metadata.title}</CardTitle>
          <CardDescription>{metadata.subTitle}</CardDescription>
          <CardAction>
            <ThemeSwitcher />
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>{metadata.description}</p>
        </CardContent>
        <CardFooter>
          <Link href="/dashboard">
            <Button>Go to dashboard</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RootPage;
