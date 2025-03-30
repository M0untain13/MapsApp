import React, { useEffect } from 'react';
import Map from '@/components/Map';
import { DbContext } from '@/db/DbContext';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '../drizzle/migrations';

const Index = () => {
  const context = new DbContext();
  const { success, error } = useMigrations(context.db, migrations);

  useEffect(() => {
    if (!success && error !== undefined) {
      console.error(error);
    }
  }, [success])

  return (
    <Map />
  );
};

export default Index;
