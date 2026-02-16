// agent_package/health_check.js
const fetch = require('node-fetch');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

async function check(endpoint, name) {
    try {
        const res = await fetch(`${BASE_URL}${endpoint}`);
        if (res.ok) {
            console.log(`✅ [PASS] ${name}`);
            return true;
        } else {
            console.error(`❌ [FAIL] ${name} (Status: ${res.status})`);
            return false;
        }
    } catch (err) {
        console.error(`❌ [FAIL] ${name} (Error: ${err.message})`);
        return false;
    }
}

async function runHealthCheck() {
    console.log(`🚀 Starting Health Check for ${BASE_URL}...`);

    const checks = [
        check('/', 'Homepage Load'),
        check('/api/health', 'API Health Endpoint'), // Assuming existence or generic check
        check('/api/auth/session', 'Auth Session Endpoint'), // Clerk check mock
        // Add more specific route checks here
    ];

    const results = await Promise.all(checks);

    if (results.every(r => r)) {
        console.log('✨ SYSTEM HEALTHY. READY FOR ACTION.');
        process.exit(0);
    } else {
        console.error('🔥 SYSTEM UNHEALTHY. IMMEDIATE FIX REQUIRED.');
        process.exit(1);
    }
}

runHealthCheck();
