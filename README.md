# Fit Tracker v0.1

PWA pessoal para registro de musculação, corrida, histórico, RIR/RPE, técnicas de intensificação, estimativa de 1RM e desconfortos.

## O que está incluído
- Biblioteca inicial curada com mais de 100 exercícios e variações.
- Cadastro de exercícios personalizados.
- Registro de séries por exercício, carga, repetições, RIR, RPE e técnica.
- Estimativa de 1RM pela fórmula de Epley (exibida para até 12 repetições).
- Registro de corrida com distância, duração, ritmo, FC média e RPE.
- Registro de desconfortos e dores.
- Histórico e painel inicial.
- PWA instalável e service worker.
- Integração Supabase com autenticação e políticas RLS.

## Ativar a nuvem
1. Crie um projeto no Supabase.
2. Abra SQL Editor e execute todo o arquivo `supabase.sql`.
3. Em Project Settings > API, copie Project URL e anon/public key.
4. Edite `config.js` e preencha `SUPABASE_URL` e `SUPABASE_ANON_KEY`.
5. Sirva a pasta por HTTPS ou localhost. Exemplo local: `python -m http.server 8000`.
6. Abra o endereço no navegador e crie sua conta.

**Nunca use a chave `service_role` no navegador.** Use somente a chave anon/public. Mantenha confirmação de e-mail conforme sua preferência de autenticação no Supabase.

## Instalar como PWA
- Publique a pasta em um host HTTPS (por exemplo, Vercel, Netlify ou Cloudflare Pages).
- Abra no celular e use "Adicionar à tela inicial" / "Instalar aplicativo".
- O service worker armazena os arquivos estáticos para acesso mais rápido. A sincronização dos dados exige conexão com a internet e Supabase configurado.

## Executar localmente
A partir desta pasta:
```bash
python -m http.server 8000
```
Acesse `http://localhost:8000`.

## Limitações conhecidas da v0.1
- Sem sincronização offline de registros; o service worker armazena os arquivos do app, mas gravações na nuvem exigem internet.
- A biblioteca inicial é curada e ampliável; não representa todos os exercícios existentes.
- Ainda não há editor completo de fichas/planejamento semanal nem gráficos avançados.
- O histórico é por registro de série; sessões compartilham um identificador.
- O registro de dor é documental, não diagnóstico.
- A corrida é manual; sem importação de relógios/GPS.
- O aplicativo não prescreve tratamento nem substitui orientação profissional.

## Próximas melhorias recomendadas
1. Tela para montar e salvar fichas semanais.
2. Agrupamento de séries por exercício e edição/exclusão de registros.
3. Gráficos de progressão por exercício e grupo muscular.
4. Registro offline com fila de sincronização.
5. Exportação CSV e backup.
6. Avaliação de tendências e recomendações explicáveis.
