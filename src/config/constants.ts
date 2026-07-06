/**
 * Application-wide constants and configuration
 */

// Current available unit listing details (shown when ARE_APPLICATIONS_OPEN is true)
export const UNIT_LISTING = {
  UNIT_TYPE: '3 Bedroom',
  MONTHLY_HOUSING_CHARGE: '$1,226',
  MOVE_IN_DATE: 'October 1, 2026',
  APPLICATION_DEADLINE: 'July 31, 2026',
  HOUSEHOLD_REQUIREMENTS: '1 or 2 adults PLUS 2 or more children under 18',
} as const;

// Form configuration including field mappings and names
export const FORM_CONFIG = {
  ARE_APPLICATIONS_OPEN: true,
  APPLICATION_FORM_URL: 'https://applications.pentacoop.com/',
  MAILING_LIST_SIGNUP: {
    name: 'Email Signup',
    submitUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfvce57NjEBBI7qx3l7eYCsjAy3j4yMqZVnjbclGOfZ9uDFIw/formResponse',
    fields: {
      EMAIL_ADDRESS: 'emailAddress',
      UNIT_PREFERENCE: 'entry.2074227584',
    },
  },
} as const;

// Analytics event names
export const ANALYTICS_EVENTS = {
  CTA_CLICK: 'cta_click',
  NAVIGATION_CLICK: 'navigation_click',
  EXTERNAL_LINK_CLICK: 'external_link_click',
  FORM_START: 'form_start',
  FORM_SUBMIT: 'form_submit',
  FORM_ERROR: 'form_error',
  FORM_ABANDONMENT: 'form_abandonment',
  INTERNAL_NAVIGATION: 'internal_navigation',
} as const;
