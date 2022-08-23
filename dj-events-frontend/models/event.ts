export type ImageFormat = {
  name: string;
  width: number;
  height: number;
  url: string;
};
export type DJEvent = {
  id: string;
  attributes: {
    name: string;
    slug: string;
    venue: string;
    address: string;
    performers: string;
    date: string;
    time: string;
    description: string;
    image: {
      data: {
        id: string;
        attributes: {
          name: string;
          alternativeText: string;
          width: number;
          height: number;
          formats: {
            thumbnail: ImageFormat;
            large: ImageFormat;
            medium: ImageFormat;
            small: ImageFormat;
          };
          url: string;
        };
      };
    };
  };
};
