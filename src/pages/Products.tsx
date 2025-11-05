import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Slider } from '../components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet';
import { Search, Star, Heart, ShoppingCart, Filter, SlidersHorizontal } from 'lucide-react';
import { Product, Activity, Category, ActivityType } from '../lib/supabase';
import { getActivitiesMock, getCategoriesMock, getActivityTypesMock, getAllProductsMock } from '../lib/mockData';
import { formatPriceTL, getCategoryFallbackImage } from '../lib/utils';
import { useCart } from '../contexts/CartContext';
import { useFavorites } from '../contexts/FavoriteContext';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activityTypes, setActivityTypes] = useState<ActivityType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedActivity, setSelectedActivity] = useState(searchParams.get('activity') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || '');
  const [selectedCity, setSelectedCity] = useState(searchParams.get('city') || '');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('newest');
  const [cities, setCities] = useState<string[]>([]);
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  useEffect(() => {
    loadFilters();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [searchQuery, selectedActivity, selectedCategory, selectedType, selectedCity, priceRange, sortBy]);

  const loadFilters = async () => {
    try {
      const activitiesData = getActivitiesMock();
      setActivities(activitiesData);

      const categoriesData = getCategoriesMock();
      setCategories(categoriesData);

      const typesData = getActivityTypesMock();
      setActivityTypes(typesData);

      const citiesData = getAllProductsMock().map((p) => p.city).filter(Boolean) as string[];
      const uniqueCities = [...new Set(citiesData)];
      setCities(uniqueCities as string[]);
    } catch (error) {
      console.error('Error loading filters:', error);
    }
  };

  const loadProducts = async () => {
    setLoading(true);
    try {
      let data = getAllProductsMock().filter((p) => p.is_active);

      if (searchQuery) {
        const s = searchQuery.toLowerCase();
        data = data.filter((p) =>
          [p.title, p.description, p.sub_title].filter(Boolean).some((t) => String(t).toLowerCase().includes(s))
        );
      }
      if (selectedActivity) {
        const typeIds = getActivityTypesMock()
          .filter((t) => t.activity_id === selectedActivity)
          .map((t) => t.id);
        if (typeIds.length) {
          data = data.filter((p) => typeIds.includes(p.activity_type_id));
        }
      }
      if (selectedCategory) {
        data = data.filter((p) => p.category_id === selectedCategory);
      }
      if (selectedType) {
        data = data.filter((p) => p.activity_type_id === selectedType);
      }
      if (selectedCity) {
        data = data.filter((p) => p.city === selectedCity);
      }
      data = data.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

      switch (sortBy) {
        case 'price-asc':
          data = data.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          data = data.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          data = data.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
          break;
        case 'newest':
        default:
          data = data.sort(
            (a, b) => new Date(b.create_date).getTime() - new Date(a.create_date).getTime()
          );
          break;
      }

      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = async (productId: string) => {
    if (isFavorite(productId)) {
      await removeFromFavorites(productId);
    } else {
      await addToFavorites(productId);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedActivity('');
    setSelectedCategory('');
    setSelectedType('');
    setSelectedCity('');
    setPriceRange([0, 1000]);
    setSortBy('newest');
    setSearchParams({});
  };

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Search</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search experiences..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Activity Theme</h3>
        <Select value={selectedActivity} onValueChange={setSelectedActivity}>
          <SelectTrigger>
            <SelectValue placeholder="All themes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All themes</SelectItem>
            {activities.map((activity) => (
              <SelectItem key={activity.id} value={activity.id}>
                {activity.activity_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Category</h3>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.category_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Activity Type</h3>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger>
            <SelectValue placeholder="All types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All types</SelectItem>
            {activityTypes.map((type) => (
              <SelectItem key={type.id} value={type.id}>
                {type.activity_type_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="font-semibold mb-3">City</h3>
        <Select value={selectedCity} onValueChange={setSelectedCity}>
          <SelectTrigger>
            <SelectValue placeholder="All cities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All cities</SelectItem>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <Slider
          min={0}
          max={1000}
          step={10}
          value={priceRange}
          onValueChange={setPriceRange}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <Button variant="outline" className="w-full" onClick={clearFilters}>
        Clear Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">All Experiences</h1>
            <p className="text-gray-600">{products.length} experiences found</p>
          </div>
          <div className="flex gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>Refine your search</SheetDescription>
                </SheetHeader>
                <div className="mt-6">
                  <FilterPanel />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </h2>
              <FilterPanel />
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Loading experiences...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No experiences found</p>
                <Button variant="outline" className="mt-4" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Card key={product.id} className="hover:shadow-lg transition-shadow">
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
                          <Heart
                            className={`h-5 w-5 ${isFavorite(product.id) ? 'fill-red-500 text-red-500' : ''}`}
                          />
                        </Button>
                        {product.rating && (
                          <Badge className="absolute bottom-2 left-2 bg-white/90 text-gray-900">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                            {product.rating}
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <CardTitle className="text-lg mb-2">{product.title}</CardTitle>
                      {product.sub_title && (
                        <CardDescription className="text-sm mb-2">{product.sub_title}</CardDescription>
                      )}
                      {product.city && <p className="text-sm text-gray-500 mb-2">📍 {product.city}</p>}
                      <p className="text-2xl font-bold text-purple-600">{formatPriceTL(product.price)}</p>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button className="flex-1" onClick={() => addToCart(product.id)}>
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Link to={`/product/${product.id}`} className="flex-1">
                        <Button variant="outline" className="w-full">
                          Details
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}