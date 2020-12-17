import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | decree', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders a decree title and date', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.setProperties({
      decree: {
         "decreet": {
           "type": "uri",
           "value": "http://www.ejustice.just.fgov.be/eli/decreet/2020/11/20/2020031703"
         },
         "verschijningsvorm": {
           "type": "uri",
           "value": "https://codex.vlaanderen.be/doc/document/1033903"
         },
         "date": {
           "type": "typed-literal",
           "datatype": "http://www.w3.org/2001/XMLSchema#date",
           "value": "2020-12-03"
         },
         "title": {
           "type": "literal",
           "value": "houdende wijziging van de Vlaamse Codex Fiscaliteit van 13 december 2013, wat betreft de aangifte van automatische ontspanningstoestellen"
         }
       }
    });

    await render(hbs`<Decree @decree={{this.decree}}/>`);

    assert.dom('.decree').exists();
    assert.dom('.decree .publication-date').exists();
    assert.dom('.decree .publication-date').hasText("2020-12-03");
    assert.dom('.decree .title').exists();
    assert.dom('.decree .title').hasText(/^houdende wijziging/);

  });
});
