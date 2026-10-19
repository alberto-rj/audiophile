import { Helmet } from 'react-helmet-async';

interface Metadata {
  title: string;
  description: string;
}

interface SEOProps {
  metadata: Metadata;
}

const SEO = ({ metadata: { title, description } }: SEOProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta
        name="title"
        content={title}
      />
      <meta
        name="description"
        content={description}
      />
    </Helmet>
  );
};

export default SEO;
