import { Page } from '@playwright/test';

export default class TecnocompPage {
  constructor(public page: Page) {}

  async acessarHome() {
    await this.page.goto(await this.baseUrl());
  }

  async buscarProduto(produto: string) {
    const searchInput = this.page.locator('input[name="q"]');
    await searchInput.waitFor({ state: 'visible', timeout: 10000 });
    await searchInput.fill(produto);
    await searchInput.press('Enter');
  }

  async acessarContato() {
    await this.page.click('a[href*="contato"]');
  }

  async baseUrl() {
    return 'https://www.tecnocomp.com.br/';
  }
}
