# BarberIA Pro 🚀

MicroSaaS completo para barbearias brasileiras com IA generativa, agendamento online, WhatsApp Business, pagamentos PIX e sistema de gamificação.

## 🌟 Funcionalidades

### 🏪 Para Barbearias
- **Dashboard Inteligente**: KPIs em tempo real, agenda visual e insights de IA
- **Gestão de Agendamentos**: Calendário interativo com confirmações automáticas
- **WhatsApp Business**: Notificações automáticas e atendimento via WhatsApp
- **Pagamentos PIX**: Integração completa com confirmação automática
- **Insights de IA**: Análise comportamental e sugestões de otimização
- **Sistema de Indicações**: Códigos únicos e programa de recompensas

### 👥 Para Clientes
- **Agendamento Online**: Interface intuitiva para agendar serviços
- **Confirmação WhatsApp**: Receba confirmações e lembretes via WhatsApp
- **Pagamento PIX**: Pague de forma rápida e segura
- **Programa de Fidelidade**: Ganhe pontos e desbloqueie recompensas
- **Sistema de Indicações**: Indique amigos e ganhe benefícios

### 🤖 IA Generativa
- **Insights Automáticos**: Análise de padrões e sugestões de otimização
- **Previsão de Demanda**: Antecipe picos de movimento
- **Recomendações Personalizadas**: Sugestões baseadas no histórico do cliente
- **Chatbot Inteligente**: Atendimento automatizado 24/7

## 🛠️ Stack Tecnológica

- **Frontend**: Next.js 15 + React 18 + TypeScript
- **Styling**: Tailwind CSS v4 + ShadCN UI + Glassmorphism
- **Backend**: Next.js API Routes + Server Actions
- **Database**: Supabase (PostgreSQL) + Auth
- **Payments**: PIX Integration
- **Messaging**: WhatsApp Business API
- **AI**: Simulado (pronto para OpenAI/Claude)
- **Deploy**: Vercel

## 🚀 Deploy Rápido

### 1. Clone e Configure

\`\`\`bash
git clone https://github.com/seu-usuario/barberia-pro.git
cd barberia-pro
npm install
\`\`\`

### 2. Variáveis de Ambiente

Crie um arquivo `.env.local`:

\`\`\`env
# Supabase (Obrigatório)
NEXT_PUBLIC_SUPABASE_URL=sua_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key
SUPABASE_JWT_SECRET=seu_jwt_secret

# Database (Obrigatório)
POSTGRES_URL=sua_postgres_url
POSTGRES_PRISMA_URL=sua_postgres_prisma_url
POSTGRES_URL_NON_POOLING=sua_postgres_url_non_pooling
POSTGRES_HOST=seu_postgres_host
POSTGRES_USER=seu_postgres_user
POSTGRES_PASSWORD=sua_postgres_password
POSTGRES_DATABASE=seu_postgres_database

# App (Obrigatório)
NEXT_PUBLIC_SITE_URL=https://seu-dominio.com
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000

# WhatsApp Business (Opcional)
WHATSAPP_PHONE_NUMBER_ID=seu_phone_number_id
WHATSAPP_ACCESS_TOKEN=seu_access_token
WHATSAPP_VERIFY_TOKEN=seu_verify_token

# PIX (Opcional)
PIX_API_KEY=sua_pix_api_key

# IA (Opcional)
OPENAI_API_KEY=sua_openai_key
GROQ_API_KEY=sua_groq_key
XAI_API_KEY=sua_xai_key

# Features (Opcional)
ENABLE_AI=true
ENABLE_WHATSAPP=true
ENABLE_PIX=true
ENABLE_GAMIFICATION=true
ENABLE_ANALYTICS=true
\`\`\`

### 3. Configure o Banco de Dados

Execute os scripts SQL no Supabase:

1. `scripts/01-create-tables.sql` - Cria as tabelas
2. `scripts/02-seed-data.sql` - Dados iniciais

### 4. Deploy na Vercel

\`\`\`bash
npm run build
vercel --prod
\`\`\`

## 📱 Como Usar

### Para Barbeiros

1. **Cadastro**: Crie sua conta em `/auth/sign-up`
2. **Setup**: Configure sua barbearia no dashboard
3. **Serviços**: Adicione seus serviços e preços
4. **Integrações**: Configure WhatsApp e PIX em `/integrations`
5. **Agenda**: Gerencie agendamentos no dashboard

### Para Clientes

1. **Agendamento**: Acesse `/booking` para agendar
2. **Pagamento**: Pague via PIX na confirmação
3. **WhatsApp**: Receba confirmações automáticas
4. **Fidelidade**: Acumule pontos em `/gamification`

## 🔧 Configurações Avançadas

### WhatsApp Business

1. Crie uma conta no Meta Business
2. Configure o WhatsApp Business API
3. Adicione as credenciais no `.env.local`
4. Configure o webhook: `/api/webhooks/whatsapp`

### Pagamentos PIX

1. Escolha um provedor PIX (PagSeguro, Mercado Pago, etc.)
2. Configure as credenciais da API
3. Configure o webhook: `/api/webhooks/pix`

### IA Generativa

1. Obtenha chaves da OpenAI, Groq ou xAI
2. Configure no `.env.local`
3. Ative com `ENABLE_AI=true`

## 📊 Monitoramento

O sistema inclui:

- **Analytics**: Rastreamento de eventos de negócio
- **Error Monitoring**: Captura e relatório de erros
- **Performance**: Métricas de performance
- **Business Metrics**: KPIs específicos do negócio

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit: `git commit -m 'Adiciona nova funcionalidade'`
4. Push: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🆘 Suporte

- **Documentação**: [docs.barberia-pro.com](https://docs.barberia-pro.com)
- **Discord**: [discord.gg/barberia-pro](https://discord.gg/barberia-pro)
- **Email**: suporte@barberia-pro.com

## 🎯 Roadmap

- [ ] App Mobile (React Native)
- [ ] Integração com Instagram
- [ ] Relatórios Avançados
- [ ] Multi-idiomas
- [ ] API Pública
- [ ] Marketplace de Plugins

---

**BarberIA Pro** - Transformando barbearias com tecnologia de ponta 🚀
