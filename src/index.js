import 'core-js';
import 'regenerator-runtime/runtime';
import { createApp, reactive } from 'vue';
import App from '@/App';
import '@/styles/index.scss';
import { I18n } from '@/lib/i18n';
import { router } from '@/lib/router';

const app = createApp(App);
app.config.globalProperties['i18n'] = reactive(new I18n());
app.config.warnHandler = app.config.errorHandler = (err) => {
    console.error(err);
}
app.use(router);
app.mount('body');