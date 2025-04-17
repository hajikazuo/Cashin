import React from 'react';
import { Breadcrumbs, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

interface BreadcrumbProps {
  paths: { label: string; href?: string }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ paths }) => {
  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 2, mb: 6 }}>
      {paths.map((path, index) =>
        path.href ? (
          <Link
            key={index}
            component={RouterLink}
            to={path.href}
            underline="hover"
            color="inherit"
          >
            {path.label}
          </Link>
        ) : (
          <Typography key={index} color="text.primary">
            {path.label}
          </Typography>
        )
      )}
    </Breadcrumbs>
  );
};

export default Breadcrumb;