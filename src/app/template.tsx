'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ConfigProvider, App } from 'antd';
import store, { useSelector } from '@/features/store';
import { AuthProvider, Spinner, RootStyleRegistry } from '@/components';

const Loading = () => {
  const isRequestLoading = useSelector(state => state.app.isLoading);

  return <Spinner loading={isRequestLoading} size="large" opacity={90} />;
};

export default function RootTemplate({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <AuthProvider>
          <Loading />
          <RootStyleRegistry>
            <ConfigProvider
              theme={{
                token: {
                  fontFamily: 'Lato',
                },
              }}
            >
              <App>{children}</App>
            </ConfigProvider>
          </RootStyleRegistry>
        </AuthProvider>
      </DndProvider>
    </Provider>
  );
}
