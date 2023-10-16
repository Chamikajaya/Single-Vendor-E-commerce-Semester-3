import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keyword' content={keywords} />
        </Helmet>
    );
};

Meta.defaultProps = {
    title: 'Welcome To our E commerce shop',
    description: 'This was done as required by DBMS Module of 3rd semester.',
    keywords: 'electronics, products, projects, ecommerce, ',
};

export default Meta;