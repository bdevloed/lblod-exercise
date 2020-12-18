import { module, test } from 'qunit';
import { click, find, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | super rentals', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function(assert) {
    await visit('/');

    assert.equal(currentURL(), '/');
    assert.dom('h1').hasText('Recently published decrees by the Flemish Government');
    assert.dom('decree').exists();

    assert.dom('.publication-date').exists();
    assert.dom('.publication-date').hasAnyText();

    assert.dom('.title').exists();
    assert.dom('.title').hasAnyText();

  });

});
