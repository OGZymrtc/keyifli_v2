import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Search, Star, Heart, ShoppingCart, Gift, Volume2, VolumeX } from 'lucide-react';
import { supabase, Activity, Product } from '../lib/supabase';
import { getActivitiesMock, getFeaturedProductsMock } from '../lib/mockData';
import { formatPriceTL, getCategoryFallbackImage } from '../lib/utils';
import { useCart } from '../contexts/CartContext';
import { useFavorites } from '../contexts/FavoriteContext';
import HomepageVideo from '../assets/home-page-cinematic.mp4';

export default function Home() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  useEffect(() => {
    loadActivities();
    loadFeaturedProducts();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true; // autoplay engelini aşmak için sessiz başla
      video.play().catch((err) => console.log("Autoplay engellendi:", err));

      // 🔊 Kullanıcı etkileşimi olduğunda sesi aç
      const enableSound = () => {
        if (video.muted) {
          video.muted = false;
          video.volume = 1.0;
          setIsMuted(false);
        }
        window.removeEventListener("click", enableSound);
        window.removeEventListener("keydown", enableSound);
      };

      window.addEventListener("click", enableSound);
      window.addEventListener("keydown", enableSound);
    }
  }, []);


  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const loadActivities = async () => {
    try {
      const data = getActivitiesMock().slice(0, 6);
      setActivities(data);
    } catch (error) {
      console.error('Error loading activities (mock):', error);
    }
  };

  const loadFeaturedProducts = async () => {
    try {
      const data = getFeaturedProductsMock(6);
      setFeaturedProducts(data);
    } catch (error) {
      console.error('Error loading featured products (mock):', error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleToggleFavorite = async (productId: string) => {
    if (isFavorite(productId)) {
      await removeFromFavorites(productId);
    } else {
      await addToFavorites(productId);
    }
  };

  // ✅ Scroll animasyonları için custom hook
  const useScrollAnimation = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

    useEffect(() => {
      if (inView) controls.start({ opacity: 1, y: 0 });
    }, [controls, inView]);

    return { ref, controls };
  };

  // Her section için ayrı animasyon kontrolü
  const heroControls = useAnimation();
  const categoriesAnim = useScrollAnimation();
  const featuredAnim = useScrollAnimation();
  const giftAnim = useScrollAnimation();
  const footerAnim = useScrollAnimation();

  return (
    <div className="min-h-screen bg-white">

      {/* 🎥 Hero Section with Sound Control */}
      <section className="relative h-[96vh] flex items-center justify-center overflow-visible">
        <video
          ref={videoRef}
          autoPlay
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center -translate-y-8"
          poster="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1920&h=1080&fit=crop"
        >
          <source src={HomepageVideo} type="video/mp4" />
        </video>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />

        {/* Hero Text */}
        <div className="relative z-10 text-center text-[#d8cfc0] max-w-3xl px-4 space-y-36 -translate-y-[88px]">
          <h1 className="text-5xl md:text-7xl font-bold drop-shadow-lg tracking-tight text-[#d7cdbf]">
            Unutulmaz Deneyimleri Keşfet
          </h1>
          <p className="text-lg md:text-2xl font-medium drop-shadow-md text-[#d7cdbf]">
            Paraşütle atlamadan spa keyfine, sıradaki maceranı bul.
          </p>
        </div>

        {/* 🔊 Ses Aç/Kapa Butonu */}
        <button
          onClick={toggleMute}
          className="absolute bottom-6 right-6 z-20 bg-white/60 hover:bg-white/80 text-gray-900 rounded-full p-3 transition"
        >
          {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
        </button>
      </section>

      {/* 🔍 Search Block */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-12 px-4 bg-white"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Unutulmaz Deneyimleri Keşfet
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-600">
            Paraşütle atlamadan spa keyfine, sıradaki maceranı bul
          </p>
          <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Bugün ne deneyimlemek istersin?"
                className="pl-10 h-12 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="h-12 px-8 text-white bg-gradient-to-r from-orange-500 to-rose-500 hover:brightness-110"
            >
              Ara
            </Button>
          </form>
        </div>
      </motion.section>

      {/* 🟠 Categories Section */}
      <motion.section
        ref={categoriesAnim.ref}
        initial={{ opacity: 0, y: 60 }}
        animate={categoriesAnim.controls}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="py-16 px-4 bg-amber-50"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Kategoriye Göre Keşfet</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity) => (
              <Link key={activity.id} to={`/products?activity=${activity.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full border-orange-100">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900">{activity.activity_name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 bg-gradient-to-br from-orange-600 via-amber-500 to-yellow-400 rounded-lg flex items-center justify-center text-white text-4xl font-bold">
                      {activity.activity_name.charAt(0)}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/products">
              <Button size="lg" variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50">
                Tüm Kategorileri Gör
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* 💎 Featured Experiences */}
      <motion.section
        ref={featuredAnim.ref}
        initial={{ opacity: 0, y: 60 }}
        animate={featuredAnim.controls}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="py-16 px-4 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Öne Çıkan Deneyimler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow border-orange-100">
                <CardHeader className="p-0">
                  <div className="relative">
                    <img
                      src={product.image_url || getCategoryFallbackImage(product.category_id)}
                      alt={product.title}
                      className="w-full h-64 object-cover rounded-t-lg"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                      onClick={() => handleToggleFavorite(product.id)}
                    >
                      <Heart className={`h-5 w-5 ${isFavorite(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                    {product.rating && (
                      <Badge className="absolute bottom-2 left-2 bg-white/90 text-gray-900 border-orange-200">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                        {product.rating}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <CardTitle className="text-lg mb-2 text-gray-900">{product.title}</CardTitle>
                  {product.sub_title && (
                    <CardDescription className="text-sm mb-2">{product.sub_title}</CardDescription>
                  )}
                  {product.city && (
                    <p className="text-sm text-gray-500 mb-2">📍 {product.city}</p>
                  )}
                  <p className="text-2xl font-bold text-orange-600">{formatPriceTL(product.price)}</p>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button
                    className="flex-1 text-white bg-gradient-to-r from-amber-600 to-rose-500 hover:brightness-110"
                    onClick={() => addToCart(product.id)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Sepete Ekle
                  </Button>
                  <Link to={`/product/${product.id}`} className="flex-1">
                    <Button variant="outline" className="w-full border-rose-300 text-rose-600 hover:bg-rose-50">
                      Detaylar
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/products">
              <Button size="lg" className="text-white px-12 bg-gradient-to-r from-orange-500 to-rose-500 hover:brightness-110">
                Tüm Deneyimleri Gör
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* 🎁 Gift Section */}
      <motion.section
        ref={giftAnim.ref}
        initial={{ opacity: 0, y: 60 }}
        animate={giftAnim.controls}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="py-16 px-4 bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-400 text-white"
      >
        <div className="max-w-4xl mx-auto text-center">
          <Gift className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">Bir Deneyim Hediye Et</h2>
          <p className="text-xl mb-8">
            Unutulmaz anıları hediye et. Doğum günleri, yıldönümleri ya da sadece mutlu etmek için.
          </p>
          <Link to="/gift">
            <Button size="lg" variant="secondary" className="bg-white text-orange-700 hover:bg-rose-50">
              Hediye Kartlarını Keşfet
            </Button>
          </Link>
        </div>
      </motion.section>

      {/* ⚙️ Footer */}
      <motion.footer
        ref={footerAnim.ref}
        initial={{ opacity: 0, y: 60 }}
        animate={footerAnim.controls}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="bg-gray-900 text-white py-12 px-4"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">KeyifliBox</h3>
          <p className="text-gray-400 mb-6">Unutulmaz deneyimleri keşfet ve rezervasyon yap</p>
          <div className="flex justify-center space-x-6 mb-6">
            <a href="#" className="hover:text-orange-400 transition-colors">Facebook</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Instagram</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Twitter</a>
          </div>
          <p className="text-gray-500 text-sm">© 2025 KeyifliBox. Tüm hakları saklıdır.</p>
        </div>
      </motion.footer>
    </div>
  );
}
