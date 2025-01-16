import { ExtensionBuilder } from '@tridion-sites/extensions';

export const addTranslations = (builder: ExtensionBuilder) => {
    builder.translations.addTranslation('en', {
        actionTitle: 'Start task',
        actionsLabel: 'Workflow actions',
        requiredFieldMessage: 'Value is required',
        okButton: 'Start',
        cancelButton: 'Abort',
        actionComplete: 'Task has been created',
    });

    builder.translations.addTranslation('de', {
        actionTitle: 'Aufgabe starten',
        actionsLabel: 'Workflow-Aktionen',
        requiredFieldMessage: 'Wert ist erforderlich',
        okButton: 'Starten',
        cancelButton: 'Abbrechen',
        actionComplete: 'Aufgabe wurde erstellt',
    });

    builder.translations.addTranslation('nl', {
        actionTitle: 'Taak starten',
        actionsLabel: 'Workflow-acties',
        requiredFieldMessage: 'Waarde is vereist',
        okButton: 'Start',
        cancelButton: 'Afbreken',
        actionComplete: 'Taak is aangemaakt',
    });

    builder.translations.addTranslation('fr', {
        actionTitle: 'Démarrer la tâche',
        actionsLabel: 'Actions du flux de travail',
        requiredFieldMessage: 'Valeur requise',
        okButton: 'Démarrer',
        cancelButton: 'Annuler',
        actionComplete: 'La tâche a été créée',
    });

    builder.translations.addTranslation('zh', {
        actionTitle: '开始任务',
        actionsLabel: '工作流操作',
        requiredFieldMessage: '值是必需的',
        okButton: '开始',
        cancelButton: '中止',
        actionComplete: '任务已创建',
    });

    builder.translations.addTranslation('es', {
        actionTitle: 'Iniciar tarea',
        actionsLabel: 'Acciones del flujo de trabajo',
        requiredFieldMessage: 'Se requiere valor',
        okButton: 'Iniciar',
        cancelButton: 'Abortar',
        actionComplete: 'La tarea ha sido creada',
    });

    builder.translations.addTranslation('ja', {
        actionTitle: 'タスクを開始',
        actionsLabel: 'ワークフローアクション',
        requiredFieldMessage: '値が必要です',
        okButton: '開始',
        cancelButton: '中止',
        actionComplete: 'タスクが作成されました',
    });
};
