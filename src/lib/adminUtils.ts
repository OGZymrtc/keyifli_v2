import * as XLSX from 'xlsx';
import { supabase, TABLES } from './supabase';

export interface BulkUploadResult {
  success: number;
  failed: number;
  errors: string[];
}

interface ActivityRow {
  activity_name: string;
}

interface CategoryRow {
  activity_id: string;
  category_name: string;
}

interface ActivityTypeRow {
  activity_id: string;
  category_id: string;
  activity_type_name: string;
}

interface ProductRow {
  activity_type_id?: string;
  category_id: string;
  title: string;
  sub_title?: string;
  description?: string;
  price: number;
  image_url?: string;
  external_url?: string;
  city?: string;
  district?: string;
  ticket_rule?: string;
  date?: string;
  rating?: number;
  is_active?: boolean;
}

// Generate Excel template for bulk upload
export const generateTemplate = (type: 'activity' | 'category' | 'activity_type' | 'product') => {
  let sampleData: unknown[] = [];

  switch (type) {
    case 'activity':
      sampleData = [
        { activity_name: 'Keşfet & Eğlen' },
        { activity_name: 'Spor & Macera' },
      ];
      break;
    case 'category':
      sampleData = [
        { activity_id: 'UUID-of-activity', category_name: 'Tema ve Macera Parkları' },
      ];
      break;
    case 'activity_type':
      sampleData = [
        { activity_id: 'UUID-of-activity', category_id: 'UUID-of-category', activity_type_name: 'Tema Park' },
      ];
      break;
    case 'product':
      sampleData = [
        {
          activity_type_id: 'UUID-of-activity-type (optional)',
          category_id: 'UUID-of-category',
          title: 'Salla Gitsin Quiz Night',
          sub_title: 'Takımını Kur, Replikleri Hatırla',
          description: 'Kahkahanın ve rekabetin buluştuğu unutulmaz bir Quiz Night deneyimi',
          price: 0,
          image_url: 'https://example.com/image.jpg',
          external_url: 'https://example.com',
          city: 'Istanbul',
          district: 'Kadıköy',
          ticket_rule: 'Sınırlı kapasiteyle gerçekleşecek',
          date: '24/10/2025 19:30:00',
          rating: 4.5,
          is_active: true,
        },
      ];
      break;
  }

  const ws = XLSX.utils.json_to_sheet(sampleData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, type);
  XLSX.writeFile(wb, `${type}_template.xlsx`);
};

// Parse Excel/CSV file
export const parseFile = async (file: File): Promise<unknown[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        resolve(json);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = reject;
    reader.readAsBinaryString(file);
  });
};

// Bulk upload activities
export const bulkUploadActivities = async (data: unknown[]): Promise<BulkUploadResult> => {
  const result: BulkUploadResult = { success: 0, failed: 0, errors: [] };

  for (const item of data) {
    const row = item as ActivityRow;
    try {
      if (!row.activity_name) {
        result.failed++;
        result.errors.push(`Row missing activity_name: ${JSON.stringify(row)}`);
        continue;
      }

      const { error } = await supabase.from(TABLES.ACTIVITY).insert({
        activity_name: row.activity_name,
      });

      if (error) throw error;
      result.success++;
    } catch (error) {
      const err = error as Error;
      result.failed++;
      result.errors.push(`Error inserting ${row.activity_name}: ${err.message}`);
    }
  }

  return result;
};

// Bulk upload categories
export const bulkUploadCategories = async (data: unknown[]): Promise<BulkUploadResult> => {
  const result: BulkUploadResult = { success: 0, failed: 0, errors: [] };

  for (const item of data) {
    const row = item as CategoryRow;
    try {
      if (!row.activity_id || !row.category_name) {
        result.failed++;
        result.errors.push(`Row missing required fields: ${JSON.stringify(row)}`);
        continue;
      }

      const { error } = await supabase.from(TABLES.CATEGORY).insert({
        activity_id: row.activity_id,
        category_name: row.category_name,
      });

      if (error) throw error;
      result.success++;
    } catch (error) {
      const err = error as Error;
      result.failed++;
      result.errors.push(`Error inserting ${row.category_name}: ${err.message}`);
    }
  }

  return result;
};

// Bulk upload activity types
export const bulkUploadActivityTypes = async (data: unknown[]): Promise<BulkUploadResult> => {
  const result: BulkUploadResult = { success: 0, failed: 0, errors: [] };

  for (const item of data) {
    const row = item as ActivityTypeRow;
    try {
      if (!row.activity_id || !row.category_id || !row.activity_type_name) {
        result.failed++;
        result.errors.push(`Row missing required fields: ${JSON.stringify(row)}`);
        continue;
      }

      const { error } = await supabase.from(TABLES.ACTIVITY_TYPE).insert({
        activity_id: row.activity_id,
        category_id: row.category_id,
        activity_type_name: row.activity_type_name,
      });

      if (error) throw error;
      result.success++;
    } catch (error) {
      const err = error as Error;
      result.failed++;
      result.errors.push(`Error inserting ${row.activity_type_name}: ${err.message}`);
    }
  }

  return result;
};

// Bulk upload products
export const bulkUploadProducts = async (data: unknown[]): Promise<BulkUploadResult> => {
  const result: BulkUploadResult = { success: 0, failed: 0, errors: [] };

  for (const item of data) {
    const row = item as ProductRow;
    try {
      if (!row.category_id || !row.title) {
        result.failed++;
        result.errors.push(`Row missing required fields: ${JSON.stringify(row)}`);
        continue;
      }

      const { error } = await supabase.from(TABLES.PRODUCT).insert({
        activity_type_id: row.activity_type_id || null,
        category_id: row.category_id,
        title: row.title,
        sub_title: row.sub_title || null,
        description: row.description || null,
        price: parseFloat(String(row.price)) || 0,
        image_url: row.image_url || null,
        external_url: row.external_url || null,
        city: row.city || null,
        district: row.district || null,
        ticket_rule: row.ticket_rule || null,
        date: row.date || null,
        rating: row.rating ? parseFloat(String(row.rating)) : null,
        is_active: row.is_active !== false,
      });

      if (error) throw error;
      result.success++;
    } catch (error) {
      const err = error as Error;
      result.failed++;
      result.errors.push(`Error inserting ${row.title}: ${err.message}`);
    }
  }

  return result;
};