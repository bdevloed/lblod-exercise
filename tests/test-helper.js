import Application from 'lblod-exercise/app';
import config from 'lblod-exercise/config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

start();
