import { HomeProvider, useHome } from './context/HomeContext';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard/Dashboard';
import { AuthModal } from './components/AuthModal';

const SectionRenderer: React.FC = () => {
  const { activeSection } = useHome();

  switch (activeSection) {
    case 'home':
      return <Dashboard />;
    case 'devices':
      return (
        <div style={{ padding: '20px' }}>
          <h2>Todos los Dispositivos</h2>
          <p>Aquí se listarán todos tus dispositivos sincronizados.</p>
        </div>
      );
    case 'flows':
      return (
        <div style={{ padding: '20px' }}>
          <h2>Automatizaciones (Flows)</h2>
          <p>Gestiona tus reglas y flujos de trabajo inteligentes.</p>
        </div>
      );
    default:
      return <Dashboard />;
  }
};

function App() {
  return (
    <HomeProvider>
      <Layout>
        <SectionRenderer />
      </Layout>
      <AuthModal />
    </HomeProvider>
  );
}

export default App;
