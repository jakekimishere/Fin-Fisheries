#!/usr/bin/env node
/**
 * JSON Schema validation for SPECIES_DATA entries (structure only).
 * Run: node scripts/validate-species-schema.js
 */
const fs = require('fs');
const path = require('path');
const { loadSpeciesData } = require('./load-species-data');

const schemaPath = path.join(__dirname, 'schemas', 'species-entry.schema.json');
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

function validateType(value, type) {
    if (type === 'object') return value !== null && typeof value === 'object' && !Array.isArray(value);
    if (Array.isArray(type)) return type.some(t => validateType(value, t));
    if (type === 'string') return typeof value === 'string';
    if (type === 'boolean') return typeof value === 'boolean';
    if (type === 'number') return typeof value === 'number';
    return true;
}

function validateSchema(value, subSchema, pathLabel, errors) {
    if (subSchema.type && !validateType(value, subSchema.type)) {
        errors.push(`${pathLabel}: expected type ${JSON.stringify(subSchema.type)}`);
        return;
    }
    if (subSchema.minLength && typeof value === 'string' && value.length < subSchema.minLength) {
        errors.push(`${pathLabel}: string too short`);
    }
    if (subSchema.pattern && typeof value === 'string' && !new RegExp(subSchema.pattern).test(value)) {
        errors.push(`${pathLabel}: does not match pattern ${subSchema.pattern}`);
    }
    if (subSchema.minProperties && typeof value === 'object' && value && !Array.isArray(value)) {
        if (Object.keys(value).length < subSchema.minProperties) {
            errors.push(`${pathLabel}: needs at least ${subSchema.minProperties} properties`);
        }
    }
    if (subSchema.required && typeof value === 'object' && value && !Array.isArray(value)) {
        for (const key of subSchema.required) {
            if (value[key] === undefined) errors.push(`${pathLabel}: missing required "${key}"`);
        }
    }
    if (subSchema.properties && typeof value === 'object' && value && !Array.isArray(value)) {
        for (const [key, propSchema] of Object.entries(subSchema.properties)) {
            if (value[key] !== undefined) {
                validateSchema(value[key], propSchema, `${pathLabel}.${key}`, errors);
            }
        }
    }
    if (subSchema.items && Array.isArray(value)) {
        value.forEach((item, i) => validateSchema(item, subSchema.items, `${pathLabel}[${i}]`, errors));
    }
}

function main() {
    const SPECIES_DATA = loadSpeciesData();
    const ids = Object.keys(SPECIES_DATA).filter(k => SPECIES_DATA[k] && SPECIES_DATA[k].name);
    const errors = [];
    console.log(`Schema-validating ${ids.length} species...`);
    for (const id of ids) {
        validateSchema(SPECIES_DATA[id], schema, id, errors);
    }
    if (errors.length) {
        console.error(`Schema errors (${errors.length}):`);
        errors.slice(0, 30).forEach(e => console.error(`  ✗ ${e}`));
        if (errors.length > 30) console.error(`  ... and ${errors.length - 30} more`);
        process.exit(1);
    }
    console.log('OK — schema validation passed.');
}

main();
