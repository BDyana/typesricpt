import { MetadataRoute } from 'next';
import { getAllCategories } from '@/actions/categories';
import { getLatestProducts } from '@/actions/products';

interface SitemapConfig {
  baseUrl: string;
  defaultChangeFreq:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never';
}

const config: SitemapConfig = {
  baseUrl: 'https://bdyana.com',
  defaultChangeFreq: 'weekly',
};

/**
 * Generates static routes with their respective priorities and change frequencies
 */
const getStaticRoutes = (): MetadataRoute.Sitemap => {
  return [
    {
      url: config.baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${config.baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${config.baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${config.baseUrl}/vendor-pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${config.baseUrl}/flash-sales`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 2,
    },
    {
      url: `${config.baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${config.baseUrl}/register`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${config.baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${config.baseUrl}/register-vendor`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${config.baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 2,
    },
  ];
};

/**
 * Generates product routes for the sitemap
 */
const getProductRoutes = async (): Promise<MetadataRoute.Sitemap> => {
  try {
    const products = await getLatestProducts();

    if (!products) return [];

    return products.map((product) => ({
      url: `${config.baseUrl}/products/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: config.defaultChangeFreq,
      priority: 0.64,
    }));
  } catch (error) {
    console.error('Error generating product routes:', error);
    return [];
  }
};

/**
 * Generates category routes for the sitemap
 */
const getCategoryRoutes = async (): Promise<MetadataRoute.Sitemap> => {
  try {
    const categories = await getAllCategories();

    if (!categories?.data) return [];

    return categories.data.map((category) => ({
      url: `${config.baseUrl}/categories/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: config.defaultChangeFreq,
      priority: 0.7,
    }));
  } catch (error) {
    console.error('Error generating category routes:', error);
    return [];
  }
};

/**
 * Generates the complete sitemap for the application
 * @returns A Promise resolving to the complete sitemap configuration
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const [productRoutes, categoryRoutes] = await Promise.all([
      getProductRoutes(),
      getCategoryRoutes(),
    ]);

    return [...getStaticRoutes(), ...productRoutes, ...categoryRoutes];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return at least static routes in case of error
    return getStaticRoutes();
  }
}
