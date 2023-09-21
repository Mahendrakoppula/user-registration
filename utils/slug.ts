import slugify from 'slugify';

const slug = (str: string) => {
  return slugify(str, {
    lower: true,
    strict: true,
    remove: /[*+~()'"!:@]/g,
  });
};

export default slug;
