# Chapter

Aplicativo de diário de leitura em React Native + Expo + TypeScript. Os dados ficam no dispositivo via AsyncStorage; não há backend nem APIs externas.

## Executar

```bash
npm install
npx expo start
```

Escaneie o QR Code com Expo Go ou execute em um emulador.

## Verificar TypeScript

```bash
npm run typecheck
```

## O que está implementado

- Navegação inferior: Home, Library, Discover, Journal e Profile.
- Biblioteca com filtros e CRUD de livros.
- Cadastro e edição de livros, validação e acompanhamento de páginas.
- Detalhes, avaliação, citações e anotações por livro.
- Diário cronológico e criação de entradas.
- Catálogo local de descoberta, com opção de adicionar à biblioteca.
- Meta anual e estatísticas calculadas a partir dos dados salvos.
- Perfil e alternância de tema claro/escuro.
- Dados de demonstração na primeira execução.

## Observações

- O catálogo Discover é estático e local, como solicitado.
- Capas podem ser inseridas por URL; imagens remotas exigem conexão para carregar. O restante do aplicativo funciona offline.
- Os dados são locais ao dispositivo e não são sincronizados entre aparelhos.
