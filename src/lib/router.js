import { createRouter, createWebHistory } from 'vue-router';
import Editor from '@/pages/Editor';
import Acknowledgments from '@/pages/Acknowledgments';
import Faq from '@/pages/Faq';

const routes = [
    {
        path: '/',
        name: 'ImpExpPopupTitle',
        component: Editor,
    }, {
        path: '/acknowledgments',
        name: 'InstructionsSectionTitle16',
        component: Acknowledgments,
    }, {
        path: '/faq',
        name: 'FAQ',
        component: Faq,
    }
];

const router = createRouter({
    history: createWebHistory('/'),
    routes,
    linkActiveClass: 'active'
});

export { router, routes };
