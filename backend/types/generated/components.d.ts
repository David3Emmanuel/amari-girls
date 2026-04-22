import type { Schema, Struct } from '@strapi/strapi';

export interface SharedBeneficiary extends Struct.ComponentSchema {
  collectionName: 'components_shared_beneficiaries';
  info: {
    displayName: 'Beneficiary';
    icon: 'handHeart';
  };
  attributes: {
    initials: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SiteContentBoard extends Struct.ComponentSchema {
  collectionName: 'components_site_content_boards';
  info: {
    displayName: 'Board';
    icon: 'users';
  };
  attributes: {
    members: Schema.Attribute.Component<'site-content.board-member', true>;
    sectionLabel: Schema.Attribute.String;
    sectionTitle: Schema.Attribute.String;
  };
}

export interface SiteContentBoardMember extends Struct.ComponentSchema {
  collectionName: 'components_site_content_board_members';
  info: {
    displayName: 'Board Member';
    icon: 'user';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String;
    role: Schema.Attribute.String;
  };
}

export interface SiteContentCommunityProject extends Struct.ComponentSchema {
  collectionName: 'components_site_content_community_projects';
  info: {
    displayName: 'Community Project';
    icon: 'pinMap';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    location: Schema.Attribute.String;
    paragraphs: Schema.Attribute.Component<'site-content.text-item', true>;
    quote: Schema.Attribute.Text;
    quoteAuthor: Schema.Attribute.String;
    sectionLabel: Schema.Attribute.String;
    sectionTitle: Schema.Attribute.String;
  };
}

export interface SiteContentContact extends Struct.ComponentSchema {
  collectionName: 'components_site_content_contacts';
  info: {
    displayName: 'Contact';
    icon: 'mail';
  };
  attributes: {
    bank: Schema.Attribute.Component<'site-content.contact-bank', false>;
    donateNote: Schema.Attribute.Text;
    email: Schema.Attribute.Email;
    location: Schema.Attribute.String;
    phones: Schema.Attribute.Component<'site-content.text-item', true>;
    sectionLabel: Schema.Attribute.String;
    sectionTitle: Schema.Attribute.String;
    socials: Schema.Attribute.Component<'site-content.text-item', true>;
  };
}

export interface SiteContentContactBank extends Struct.ComponentSchema {
  collectionName: 'components_site_content_contact_banks';
  info: {
    displayName: 'Contact Bank';
    icon: 'creditCard';
  };
  attributes: {
    accountName: Schema.Attribute.String;
    accountNumber: Schema.Attribute.String;
    bankName: Schema.Attribute.String;
  };
}

export interface SiteContentCtaButton extends Struct.ComponentSchema {
  collectionName: 'components_site_content_cta_buttons';
  info: {
    displayName: 'CTA Button';
    icon: 'cursor';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    variant: Schema.Attribute.Enumeration<['primary', 'outline']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'primary'>;
  };
}

export interface SiteContentFooter extends Struct.ComponentSchema {
  collectionName: 'components_site_content_footers';
  info: {
    displayName: 'Footer';
    icon: 'layout';
  };
  attributes: {
    brandDescription: Schema.Attribute.Text;
    copyrightOrg: Schema.Attribute.String;
    email: Schema.Attribute.Email;
    links: Schema.Attribute.Component<'site-content.footer-link', true>;
    location: Schema.Attribute.String;
    logoText: Schema.Attribute.String;
    orgNameLine1: Schema.Attribute.String;
    orgNameLine2: Schema.Attribute.String;
    phone: Schema.Attribute.String;
    registrationNote: Schema.Attribute.String;
  };
}

export interface SiteContentFooterLink extends Struct.ComponentSchema {
  collectionName: 'components_site_content_footer_links';
  info: {
    displayName: 'Footer Link';
    icon: 'link';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SiteContentFounder extends Struct.ComponentSchema {
  collectionName: 'components_site_content_founders';
  info: {
    displayName: 'Founder';
    icon: 'user';
  };
  attributes: {
    bio: Schema.Attribute.Component<'site-content.text-item', true>;
    image: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String;
    noteLabel: Schema.Attribute.String;
    role: Schema.Attribute.String;
    sectionLabel: Schema.Attribute.String;
    sectionTitle: Schema.Attribute.String;
  };
}

export interface SiteContentGallery extends Struct.ComponentSchema {
  collectionName: 'components_site_content_galleries';
  info: {
    displayName: 'Gallery';
    icon: 'landscape';
  };
  attributes: {
    images: Schema.Attribute.Component<'site-content.gallery-image', true>;
    sectionLabel: Schema.Attribute.String;
    sectionTitle: Schema.Attribute.String;
  };
}

export interface SiteContentGalleryImage extends Struct.ComponentSchema {
  collectionName: 'components_site_content_gallery_images';
  info: {
    displayName: 'Gallery Image';
    icon: 'picture';
  };
  attributes: {
    alt: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
  };
}

export interface SiteContentHeadline extends Struct.ComponentSchema {
  collectionName: 'components_site_content_headlines';
  info: {
    displayName: 'Headline';
    icon: 'bold';
  };
  attributes: {
    accent: Schema.Attribute.String & Schema.Attribute.Required;
    main: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SiteContentHero extends Struct.ComponentSchema {
  collectionName: 'components_site_content_heroes';
  info: {
    displayName: 'Hero';
    icon: 'monitor';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    ctaButtons: Schema.Attribute.Component<'site-content.cta-button', true>;
    headingLine1: Schema.Attribute.String;
    headingLine2: Schema.Attribute.String;
    headingLine3Desktop: Schema.Attribute.Component<
      'site-content.headline',
      false
    >;
    headingLine3Mobile: Schema.Attribute.Component<
      'site-content.headline',
      false
    >;
    headingLine4: Schema.Attribute.String;
    label: Schema.Attribute.String;
    socials: Schema.Attribute.Component<'site-content.social', true>;
    stats: Schema.Attribute.Component<'site-content.stats', true>;
    tagline: Schema.Attribute.String;
  };
}

export interface SiteContentMissionVision extends Struct.ComponentSchema {
  collectionName: 'components_site_content_mission_visions';
  info: {
    displayName: 'Mission Vision';
    icon: 'earth';
  };
  attributes: {
    missionText: Schema.Attribute.Text;
    sectionLabel: Schema.Attribute.String;
    sectionTitle: Schema.Attribute.String;
    visionText: Schema.Attribute.Text;
  };
}

export interface SiteContentNavigationBar extends Struct.ComponentSchema {
  collectionName: 'components_site_content_navigation_bars';
  info: {
    displayName: 'Navigation Bar';
    icon: 'link';
  };
  attributes: {
    donateHref: Schema.Attribute.String;
    donateLabel: Schema.Attribute.String;
    links: Schema.Attribute.Component<'site-content.navigation-link', true>;
    logoText: Schema.Attribute.String;
    orgName: Schema.Attribute.String;
  };
}

export interface SiteContentNavigationLink extends Struct.ComponentSchema {
  collectionName: 'components_site_content_navigation_links';
  info: {
    displayName: 'Navigation Link';
    icon: 'link';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SiteContentObjectives extends Struct.ComponentSchema {
  collectionName: 'components_site_content_objectives';
  info: {
    displayName: 'Objectives';
    icon: 'check';
  };
  attributes: {
    items: Schema.Attribute.Component<'site-content.text-item', true>;
    sectionLabel: Schema.Attribute.String;
    sectionTitle: Schema.Attribute.String;
  };
}

export interface SiteContentPartner extends Struct.ComponentSchema {
  collectionName: 'components_site_content_partners';
  info: {
    displayName: 'Partner';
    icon: 'gift';
  };
  attributes: {
    options: Schema.Attribute.Component<'site-content.partner-option', true>;
    sectionLabel: Schema.Attribute.String;
    sectionTitle: Schema.Attribute.String;
  };
}

export interface SiteContentPartnerOption extends Struct.ComponentSchema {
  collectionName: 'components_site_content_partner_options';
  info: {
    displayName: 'Partner Option';
    icon: 'handHeart';
  };
  attributes: {
    accent: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    cta: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    num: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SiteContentSocial extends Struct.ComponentSchema {
  collectionName: 'components_site_content_socials';
  info: {
    displayName: 'Social';
    icon: 'globe';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SiteContentStats extends Struct.ComponentSchema {
  collectionName: 'components_site_content_stats';
  info: {
    displayName: 'Stats';
    icon: 'slideshow';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    num: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SiteContentTestimonialItem extends Struct.ComponentSchema {
  collectionName: 'components_site_content_testimonial_items';
  info: {
    displayName: 'Testimonial Item';
    icon: 'quote';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String;
    quote: Schema.Attribute.Text;
    role: Schema.Attribute.String;
  };
}

export interface SiteContentTestimonials extends Struct.ComponentSchema {
  collectionName: 'components_site_content_testimonials';
  info: {
    displayName: 'Testimonials';
    icon: 'feather';
  };
  attributes: {
    featuredAuthor: Schema.Attribute.String;
    featuredQuote: Schema.Attribute.Text;
    featuredRole: Schema.Attribute.String;
    items: Schema.Attribute.Component<'site-content.testimonial-item', true>;
    sectionLabel: Schema.Attribute.String;
    sectionTitle: Schema.Attribute.String;
  };
}

export interface SiteContentTextItem extends Struct.ComponentSchema {
  collectionName: 'components_site_content_text_items';
  info: {
    displayName: 'Text Item';
    icon: 'paragraph';
  };
  attributes: {
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SiteSettingsBankDetails extends Struct.ComponentSchema {
  collectionName: 'components_site_settings_bank_details';
  info: {
    displayName: 'Bank Details';
    icon: 'briefcase';
  };
  attributes: {
    accountName: Schema.Attribute.String & Schema.Attribute.Required;
    accountNumber: Schema.Attribute.String & Schema.Attribute.Required;
    bankName: Schema.Attribute.String & Schema.Attribute.Required;
    donateNote: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SiteSettingsContactInfo extends Struct.ComponentSchema {
  collectionName: 'components_site_settings_contact_infos';
  info: {
    displayName: 'Contact Info';
    icon: 'phone';
  };
  attributes: {
    email: Schema.Attribute.Email & Schema.Attribute.Required;
    location: Schema.Attribute.String & Schema.Attribute.Required;
    phones: Schema.Attribute.Component<'site-settings.phone-number', true> &
      Schema.Attribute.Required;
  };
}

export interface SiteSettingsPhoneNumber extends Struct.ComponentSchema {
  collectionName: 'components_site_settings_phone_numbers';
  info: {
    displayName: 'Phone Number';
    icon: 'phone';
  };
  attributes: {
    phone: Schema.Attribute.String;
  };
}

export interface SiteSettingsSocialLinks extends Struct.ComponentSchema {
  collectionName: 'components_site_settings_social_links';
  info: {
    displayName: 'Social Links';
    icon: 'link';
  };
  attributes: {
    facebook: Schema.Attribute.String;
    instagram: Schema.Attribute.String;
    twitter: Schema.Attribute.String;
    youtube: Schema.Attribute.String;
  };
}

export interface VolunteerVolunteerTask extends Struct.ComponentSchema {
  collectionName: 'components_volunteer_volunteer_tasks';
  info: {
    displayName: 'Volunteer Task';
    icon: 'bulletList';
  };
  attributes: {
    task: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.beneficiary': SharedBeneficiary;
      'site-content.board': SiteContentBoard;
      'site-content.board-member': SiteContentBoardMember;
      'site-content.community-project': SiteContentCommunityProject;
      'site-content.contact': SiteContentContact;
      'site-content.contact-bank': SiteContentContactBank;
      'site-content.cta-button': SiteContentCtaButton;
      'site-content.footer': SiteContentFooter;
      'site-content.footer-link': SiteContentFooterLink;
      'site-content.founder': SiteContentFounder;
      'site-content.gallery': SiteContentGallery;
      'site-content.gallery-image': SiteContentGalleryImage;
      'site-content.headline': SiteContentHeadline;
      'site-content.hero': SiteContentHero;
      'site-content.mission-vision': SiteContentMissionVision;
      'site-content.navigation-bar': SiteContentNavigationBar;
      'site-content.navigation-link': SiteContentNavigationLink;
      'site-content.objectives': SiteContentObjectives;
      'site-content.partner': SiteContentPartner;
      'site-content.partner-option': SiteContentPartnerOption;
      'site-content.social': SiteContentSocial;
      'site-content.stats': SiteContentStats;
      'site-content.testimonial-item': SiteContentTestimonialItem;
      'site-content.testimonials': SiteContentTestimonials;
      'site-content.text-item': SiteContentTextItem;
      'site-settings.bank-details': SiteSettingsBankDetails;
      'site-settings.contact-info': SiteSettingsContactInfo;
      'site-settings.phone-number': SiteSettingsPhoneNumber;
      'site-settings.social-links': SiteSettingsSocialLinks;
      'volunteer.volunteer-task': VolunteerVolunteerTask;
    }
  }
}
