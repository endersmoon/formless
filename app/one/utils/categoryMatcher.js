// Keyword to category mapping
const CATEGORY_KEYWORD_MAPPING = {
  'sales': 'Sales / Business Development',
  'marketing': 'Marketing',
  'customer': 'Customer Support / TeleCaller',
  'support': 'Customer Support / TeleCaller',
  'telecaller': 'Customer Support / TeleCaller',
  'call': 'Customer Support / TeleCaller',
  'tele': 'Customer Support / TeleCaller',
  'delivery': 'Delivery',
  'driver': 'Driver',
  'tech': 'IT / Hardware / Network Engineer',
  'developer': 'IT / Hardware / Network Engineer',
  'engineer': 'IT / Hardware / Network Engineer',
  'design': 'Graphic / Web Designer',
  'account': 'Accountant',
  'admin': 'Recruiter / HR / Admin',
  'hr': 'Recruiter / HR / Admin',
  'recruit': 'Recruiter / HR / Admin',
  'data': 'Back Office / Data Entry',
  'entry': 'Back Office / Data Entry',
  'warehouse': 'Warehouse / Logistics',
  'logistics': 'Warehouse / Logistics',
  'chef': 'Cook / Chef',
  'cook': 'Cook / Chef',
};

/**
 * Find a matching job category based on a job title
 * @param {string} title - The job title to match
 * @returns {string|null} - The matching category or null if no match found
 */
export function findMatchingCategory(title) {
  const titleLower = title.toLowerCase();
  
  for (const [keyword, category] of Object.entries(CATEGORY_KEYWORD_MAPPING)) {
    if (titleLower.includes(keyword)) {
      return category;
    }
  }
  
  return null;
}

/**
 * Get the mapping of keywords to categories
 * @returns {Object} - The mapping object
 */
export function getCategoryMapping() {
  return CATEGORY_KEYWORD_MAPPING;
} 