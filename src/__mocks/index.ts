import { ERole } from '@/components/CardRole';

export const roleOptions = [
  { id: ERole.ADMIN, value: ERole.ADMIN, label: 'Administrator' },
  { id: ERole.MANAGER, value: ERole.MANAGER, label: 'Team' },
];

export const accessRoleOpetions = [
  { id: ERole.ADMIN, value: ERole.ADMIN, label: 'Full' },
  { id: ERole.MANAGER, value: ERole.MANAGER, label: 'Limited' },
];

export const teamMemberOptions = [
  { label: 'John Doe', value: 'john-doe' },
  { label: 'Jane Doe', value: 'jane-doe' },
  { label: 'Alice Doe', value: 'alice-doe' },
  { label: 'Bob Doe', value: 'bob-doe' },
  { label: 'Eve Doe', value: 'eve-doe' },
];

export const timeZoneOptions = [
  { label: '(GMT+10:00) Sydney, Melbourne, Brisbane (AEST)', value: 'AEST' },
  { label: '(GMT+00:00) Dublin, Edinburgh, Lisbon, London (GMT)', value: 'GMT' },
  { label: '(GMT+01:00) Amsterdam, Berlin, Rome, Stockholm, Vienna (CET)', value: 'CET' },
  { label: '(GMT+02:00) Athens, Bucharest, Istanbul (EET)', value: 'EET' },
  { label: '(GMT+03:00) Moscow, Saint Petersburg, Nairobi (MSK)', value: 'MSK' },
  { label: '(GMT+03:30) Tehran (IRST)', value: 'IRST' },
  { label: '(GMT+04:00) Dubai, Abu Dhabi, Muscat (GST)', value: 'GST' },
  { label: '(GMT+05:30) Mumbai, New Delhi, Bengaluru (IST)', value: 'IST' },
  { label: '(GMT+06:00) Dhaka, Almaty (BST)', value: 'BST' },
  { label: '(GMT+07:00) Bangkok, Hanoi, Jakarta (ICT)', value: 'ICT' },
  { label: '(GMT+08:00) Beijing, Singapore, Perth (CST)', value: 'CST' },
  { label: '(GMT+09:00) Tokyo, Seoul, Osaka (JST)', value: 'JST' },
  { label: '(GMT-05:00) Eastern Time (US and Canada) (EST)', value: 'EST' },
  { label: '(GMT-08:00) Pacific Time (US and Canada) (PST)', value: 'PST' },
  { label: '(GMT-03:00) Buenos Aires, Montevideo (ART)', value: 'ART' },
  { label: '(GMT-10:00) Hawaii (HST)', value: 'HST' },
];

export const departmentOptions = [
  { label: 'Engineering', value: 'engineering' },
  { label: 'Product', value: 'product' },
  { label: 'Design', value: 'design' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Sales', value: 'sales' },
  { label: 'Customer Support', value: 'customer-support' },
  { label: 'Human Resources', value: 'human-resources' },
  { label: 'Finance', value: 'finance' },
  { label: 'Operations', value: 'operations' },
  { label: 'Legal', value: 'legal' },
  { label: 'Research & Development', value: 'research-development' },
  { label: 'Quality Assurance', value: 'quality-assurance' },
  { label: 'Business Development', value: 'business-development' },
  { label: 'Administration', value: 'administration' },
];

export const industryOptions = [
  { label: 'Advertising & Marketing', value: 'advertising_marketing' },
  { label: 'Agriculture', value: 'agriculture' },
  { label: 'Automotive', value: 'automotive' },
  { label: 'Banking & Finance', value: 'banking_finance' },
  { label: 'Construction', value: 'construction' },
  { label: 'Consulting', value: 'consulting' },
  { label: 'Education', value: 'education' },
  { label: 'Energy & Utilities', value: 'energy_utilities' },
  { label: 'Entertainment & Media', value: 'entertainment_media' },
  { label: 'Fashion & Apparel', value: 'fashion_apparel' },
  { label: 'Food & Beverage', value: 'food_beverage' },
  { label: 'Government', value: 'government' },
  { label: 'Healthcare & Pharmaceuticals', value: 'healthcare_pharmaceuticals' },
  { label: 'Hospitality & Tourism', value: 'hospitality_tourism' },
  { label: 'Insurance', value: 'insurance' },
  { label: 'IT & Technology', value: 'it_technology' },
  { label: 'Legal Services', value: 'legal_services' },
  { label: 'Manufacturing', value: 'manufacturing' },
  { label: 'Non-Profit & Charities', value: 'non_profit_charities' },
  { label: 'Real Estate', value: 'real_estate' },
  { label: 'Retail & E-commerce', value: 'retail_ecommerce' },
  { label: 'Telecommunications', value: 'telecommunications' },
  { label: 'Transportation & Logistics', value: 'transportation_logistics' },
  { label: 'Wholesale & Distribution', value: 'wholesale_distribution' },
];

export const languageOptions = [
  { label: 'English', value: 'en' },
  { label: 'Spanish', value: 'es' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
  { label: 'Chinese (Simplified)', value: 'zh-CN' },
  { label: 'Chinese (Traditional)', value: 'zh-TW' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Korean', value: 'ko' },
  { label: 'Vietnamese', value: 'vi' },
  { label: 'Russian', value: 'ru' },
  { label: 'Arabic', value: 'ar' },
  { label: 'Portuguese', value: 'pt' },
  { label: 'Hindi', value: 'hi' },
  { label: 'Italian', value: 'it' },
  { label: 'Dutch', value: 'nl' },
  { label: 'Swedish', value: 'sv' },
  { label: 'Turkish', value: 'tr' },
  { label: 'Thai', value: 'th' },
  { label: 'Greek', value: 'el' },
  { label: 'Polish', value: 'pl' },
];

export const categoryOptions = [
  { label: 'Digital Marketing', value: 'digital_marketing' },
  { label: 'Creative & Design', value: 'creative_design' },
  { label: 'Development', value: 'development' },
  { label: 'Analytics & Data', value: 'analytics_data' },
  { label: 'Paid Advertising', value: 'paid_advertising' },
];

export const accessLevelOptions = [
  { label: 'Full', value: 'full' },
  { label: 'Limited', value: 'limited' },
];

export const dateFilterOptions = [
  { label: 'Last 30 days', value: 30 },
  { label: 'Last 60 days', value: 60 },
  { label: 'Last 90 days', value: 90 },
  { label: 'Last 180 days', value: 180 },
  { label: 'Last 365 days', value: 365 },
];

export const sortByOptions = [
  { label: 'Most Recent', value: 'recent' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'Amount: High to Low', value: 'high' },
  { label: 'Amount: Low to High', value: 'low' },
];

export const platformOptions = [
  { label: 'Facebook', value: 'facebook' },
  { label: 'Instagram', value: 'instagram' },
  { label: 'Twitter (X)', value: 'twitter' },
  { label: 'LinkedIn', value: 'linkedin' },
  { label: 'Snapchat', value: 'snapchat' },
  { label: 'Pinterest', value: 'pinterest' },
  { label: 'Reddit', value: 'reddit' },
  { label: 'Tumblr', value: 'tumblr' },
  { label: 'Quora', value: 'quora' },
  { label: 'YouTube', value: 'youtube' },
  { label: 'TikTok', value: 'tiktok' },
  { label: 'Vimeo', value: 'vimeo' },
  { label: 'DailyMotion', value: 'dailymotion' },
  { label: 'Twitch', value: 'twitch' },
  { label: 'WhatsApp', value: 'whatsapp' },
  { label: 'Facebook Messenger', value: 'facebook_messenger' },
  { label: 'Telegram', value: 'telegram' },
  { label: 'WeChat', value: 'wechat' },
  { label: 'Threads by Meta', value: 'threads_by_meta' },
  { label: 'Glassdoor', value: 'glassdoor' },
  { label: 'AngelList', value: 'angel_list' },
  { label: 'Github', value: 'github' },
  { label: 'Google', value: 'google' },
];

export const mediumOptions = [
  { label: 'Paid Media', value: 'paid_media' },
  { label: 'Owned Media', value: 'owned_media' },
  { label: 'Earned Media', value: 'earned_media' },
  { label: 'Shared Media', value: 'shared_media' },
  { label: 'Affiliate Marketing', value: 'affiliate_marketing' },
  { label: 'Remarketing/Retargeting', value: 'remarketing_retargeting' },
  { label: 'Audio Advertising', value: 'audio_advertising' },
  { label: 'In-App Advertising', value: 'in_app_advertising' },
  { label: 'SMS and Messaging Ads', value: 'sms_and_messaging_ads' },
  { label: 'Experiential and Interactive Ads', value: 'experiential_and_interactive_ads' },
];

export const sourceOptions = [
  { label: 'Google Ads', value: 'google_ads' },
  { label: 'Facebook Ads', value: 'facebook_ads' },
  { label: 'Instagram Ads', value: 'instagram_ads' },
];
