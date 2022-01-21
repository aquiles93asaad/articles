export const url = 'http://www.pinkvilla.com';

export const galleryUrl = (page) => 
  `${url}/photo-gallery-feed-page${page ? '/page/' + page : ''}`;