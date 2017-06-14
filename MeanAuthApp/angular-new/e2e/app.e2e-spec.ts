import { AngularNewPage } from './app.po';

describe('angular-new App', function() {
  let page: AngularNewPage;

  beforeEach(() => {
    page = new AngularNewPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
