import { InjectionToken } from '@angular/core';

import { IAppConfig } from './iapp.config';
import { AdminConfig } from './admin.config';

export let APP_CONFIG = new InjectionToken('app.config');

let envConfig: IAppConfig;
envConfig = AdminConfig;

export const AppConfig: IAppConfig = envConfig;