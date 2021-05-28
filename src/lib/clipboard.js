export class Clipboard {
    static async acquirePermission(permission) {
        if (!navigator.permissions) {
            return true;
        }
        try {
            const result = await navigator.permissions.query({
                name: permission,
            });
            return result.state !== 'denied';
        } catch (e) {
            console.debug(e);
            return false;
        }
    }

    static async checkReadAccess() {
        const hasPermission = await Clipboard.acquirePermission('clipboard-read');
        return hasPermission && navigator.clipboard && navigator.clipboard.readText;
    }

    static async checkWriteAccess() {
        const hasPermission = await Clipboard.acquirePermission('clipboard-write');
        return hasPermission && navigator.clipboard && navigator.clipboard.writeText;
    }

    static async read() {
        if (!await Clipboard.checkReadAccess()) {
            console.error('Your browser does not support native copy from clipboard');
            return undefined;
        }
        try {
            return await navigator.clipboard.readText();
        } catch (e) {
            console.error(`Automatic paste failed: ${e}`);
        }
        return undefined;
    }

    static async write(data) {
        if (!await Clipboard.checkWriteAccess()) {
            console.error('Your browser does not support native paste to clipboard');
            return false;
        }
        try {
            await navigator.clipboard.writeText(data);
            return true;
        } catch (e) {
            console.error(`Automatic copy failed: ${e}`);
        }
        return false;
    }
}