import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DefaultDataServiceConfig, EntityDataModule } from '@ngrx/data';
import { EntityConfig } from './store/post-entity-metadata';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: 'https://rtf-firebase-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
  timeout: 3000, // request timeout
};
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
      trace: true,
      traceLimit: 75,
    }),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(EntityConfig),
  ],
  providers: [
    // { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
