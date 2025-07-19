import heroBanner from "../../public/hero-banner.jpg";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted/30 to-primary/5">
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Discover the
                <span className=" from-primary to-accent bg-sky-500 bg-clip-text text-transparent">
                  {" "}
                  Future
                </span>{" "}
                of Tech
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                From cutting-edge smartphones to powerful laptops, find the
                latest technology that transforms your digital experience.
              </p>
            </div>
            <div className="flex items-center space-x-8 pt-8 border-t">
              <div>
                <div className="text-2xl font-bold text-foreground">10K+</div>
                <div className="text-sm text-muted-foreground">
                  Happy Customers
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">500+</div>
                <div className="text-sm text-muted-foreground">Products</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
            </div>
          </div>
          <Image
            src={heroBanner}
            alt="Latest Tech Products"
            width={800}
            height={600}
            className="relative z-10 w-full h-auto rounded-2xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
