import { Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import Layout from './components/Layout';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="*" children={<Layout />} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
