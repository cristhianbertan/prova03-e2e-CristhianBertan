
import { test } from '@playwright/test';
import TecnocompPage from '../support/pages/TecnocompPage';

test.describe('Testes Tecnocomp', () => {
  let tecnocompPage: TecnocompPage;
  const BASE_URL = 'https://www.tecnocomp.com.br/';

  test.beforeEach(async ({ page }) => {
    tecnocompPage = new TecnocompPage(page);
    await page.goto(BASE_URL);
  });

  test('Preencher formulário de contato com dados válidos', async () => {
    await tecnocompPage.page.goto('https://www.tecnocomp.com.br/contato');
    await tecnocompPage.page.fill('input[name="nome"]', 'Usuário Teste');
    await tecnocompPage.page.fill('input[name="email"]', 'usuario@teste.com');
    await tecnocompPage.page.fill('input[name="telefone"]', '(11) 99999-9999');
    await tecnocompPage.page.selectOption('select[name="cf_8dh_cargo"]', { label: 'Gerente' });
    await tecnocompPage.page.fill('input[name="empresa"]', 'Empresa Teste');
    await tecnocompPage.page.selectOption('select[name="cf_quantidade_de_funcionarios"]', { label: '1 a 20' });
    await tecnocompPage.page.selectOption('select[name="cf_8dh_interesse"]', { label: 'Infraestrutura de TI' });
    await tecnocompPage.page.fill('textarea[name="cf_mensagem"]', 'Mensagem de teste válida.');
    await tecnocompPage.page.check('input[name="Newsletter"]');
    // Não envia o formulário para evitar spam real
    await test.expect(tecnocompPage.page.locator('form')).toBeVisible();
  });

  test('Preencher formulário de contato com dados inválidos', async () => {
    await tecnocompPage.page.goto('https://www.tecnocomp.com.br/contato');
    await tecnocompPage.page.fill('input[name="nome"]', ''); // Nome vazio
    await tecnocompPage.page.fill('input[name="email"]', 'email-invalido@gmail.com'); // Email inválido
    await tecnocompPage.page.fill('input[name="telefone"]', '123'); // Telefone inválido
    await tecnocompPage.page.selectOption('select[name="cf_8dh_cargo"]', { label: 'Estagiário/Trainee' });
    await tecnocompPage.page.fill('input[name="empresa"]', ''); // Empresa vazia
    await tecnocompPage.page.selectOption('select[name="cf_quantidade_de_funcionarios"]', { label: '1 a 20' });
    await tecnocompPage.page.selectOption('select[name="cf_8dh_interesse"]', { label: 'Infraestrutura de TI' });
    await tecnocompPage.page.fill('textarea[name="cf_mensagem"]', ''); // Mensagem vazia
    // Não marca o checkbox
    // Não envia o formulário para evitar spam real
    await test.expect(tecnocompPage.page.locator('form')).toBeVisible();
    // Valida mensagem de erro de e-mail corporativo
    await test.expect(
      tecnocompPage.page.getByText('E-mails pessoais não são permitidos. Use um e-mail corporativo.')
    ).toBeVisible();
  });

  test('Acessar página de contato', async () => {
    await tecnocompPage.acessarContato();
    await test.expect(tecnocompPage.page).toHaveURL(/contato/);
    await test.expect(tecnocompPage.page.locator('form')).toBeVisible();
  });
});
