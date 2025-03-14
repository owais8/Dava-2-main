import qs from 'qs';

const shared = {
  sleep: (second: number) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000 * second);
    });
  },
  formatQueryString: (
    baseUrl: string,
    queryParams?: Record<string, string | number | boolean> | string | (string | number)[],
  ): string => {
    let url = baseUrl;

    // Handle query parameters if queryParams is an object
    if (queryParams && typeof queryParams === 'object' && !Array.isArray(queryParams)) {
      const cleanedQuery = Object.fromEntries(
        Object.entries(queryParams).filter(([_, value]) => value !== '' && value != null),
      );

      const queryString = qs.stringify(cleanedQuery, {
        arrayFormat: 'brackets',
      });

      if (queryString) {
        url += `?${queryString}`;
      }
    }
    // Handle path parameters if queryParams is a string or an array
    else if (typeof queryParams === 'string' || Array.isArray(queryParams)) {
      const formattedPathParams = Array.isArray(queryParams)
        ? queryParams.filter(Boolean).join('/')
        : queryParams;

      url = `${baseUrl}/${formattedPathParams}`;
    }

    return url;
  },
  getAvatarName: (fullName: string): string => {
    if (!fullName) return '';

    const nameParts = fullName.trim().split(' ');
    if (nameParts.length >= 2) {
      const firstNameInitial = nameParts[0][0].toUpperCase();
      const lastNameInitial = nameParts[1][0].toUpperCase();

      return `${firstNameInitial}${lastNameInitial}`;
    }

    return nameParts[0][0].toUpperCase() + (nameParts[0][1] ? nameParts[0][1].toUpperCase() : '');
  },
};

export default shared;
