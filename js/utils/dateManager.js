// Date Manager Module
// Centralized date handling for fisheries regulations

class DateManager {
    constructor() {
        this.assessmentDate = new Date(); // Default to today, but can be set
    }

    // Set the assessment date (for historical/future assessments)
    setAssessmentDate(date) {
        if (typeof date === 'string') {
            this.assessmentDate = new Date(date);
        } else if (date instanceof Date) {
            this.assessmentDate = new Date(date);
        } else {
            this.assessmentDate = new Date();
        }
        return this.assessmentDate;
    }

    // Get current assessment date
    getAssessmentDate() {
        return new Date(this.assessmentDate);
    }

    // Get current year
    getCurrentYear() {
        return this.assessmentDate.getFullYear();
    }

    // Get current month (1-12)
    getCurrentMonth() {
        return this.assessmentDate.getMonth() + 1;
    }

    // Get current day of month
    getCurrentDay() {
        return this.assessmentDate.getDate();
    }

    // Check if date is within a date range
    isDateInRange(startDate, endDate) {
        const assessment = this.getAssessmentDate();
        const start = this.parseDate(startDate);
        const end = this.parseDate(endDate);
        
        if (!start || !end) return false;
        
        return assessment >= start && assessment <= end;
    }

    // Check if date is within a seasonal range (month-based, can span years)
    isDateInSeasonalRange(seasonConfig) {
        const month = this.getCurrentMonth();
        const day = this.getCurrentDay();
        
        if (seasonConfig.months && Array.isArray(seasonConfig.months)) {
            // Simple month-based check
            return seasonConfig.months.includes(month);
        }
        
        if (seasonConfig.startMonth && seasonConfig.endMonth) {
            // Range that can span years
            const startMonth = seasonConfig.startMonth;
            const endMonth = seasonConfig.endMonth;
            const startDay = seasonConfig.startDay || 1;
            const endDay = seasonConfig.endDay || 31;
            
            if (startMonth <= endMonth) {
                // Same year range (e.g., May 1 - Oct 31)
                if (month === startMonth) {
                    return day >= startDay;
                } else if (month === endMonth) {
                    return day <= endDay;
                } else {
                    return month > startMonth && month < endMonth;
                }
            } else {
                // Spans year (e.g., Nov 1 - Apr 30)
                if (month > startMonth || month < endMonth) {
                    return true;
                } else if (month === startMonth) {
                    return day >= startDay;
                } else if (month === endMonth) {
                    return day <= endDay;
                }
            }
        }
        
        return false;
    }

    // Parse date string or Date object
    parseDate(dateInput) {
        if (!dateInput) return null;
        
        if (dateInput instanceof Date) {
            return new Date(dateInput);
        }
        
        if (typeof dateInput === 'string') {
            // Handle format: "2026-01-14T23:30:00" or "2026-01-14"
            const parsed = new Date(dateInput);
            if (isNaN(parsed.getTime())) {
                console.error('Invalid date:', dateInput);
                return null;
            }
            return parsed;
        }
        
        return null;
    }

    // Check if a closure is active (supports annual recurring closures)
    isClosureActive(closureConfig) {
        if (!closureConfig) return false;
        
        // If closure has specific dates
        if (closureConfig.startDate && closureConfig.endDate) {
            // Check if dates are year-specific or recurring
            if (closureConfig.recurring) {
                // Annual recurring closure (e.g., Jan 14 - Mar 31 every year)
                const currentYear = this.getCurrentYear();
                const startDate = this.parseDate(closureConfig.startDate.replace('YYYY', currentYear));
                const endDate = this.parseDate(closureConfig.endDate.replace('YYYY', currentYear));
                
                if (startDate && endDate) {
                    return this.isDateInRange(startDate, endDate);
                }
            } else {
                // Specific year closure
                return this.isDateInRange(closureConfig.startDate, closureConfig.endDate);
            }
        }
        
        // If closure uses month-based approach
        if (closureConfig.months) {
            return this.isDateInSeasonalRange({ months: closureConfig.months });
        }
        
        return false;
    }

    // Format date for display
    formatDate(date, format = 'long') {
        if (!date) return 'N/A';
        
        const d = date instanceof Date ? date : this.parseDate(date);
        if (!d) return 'Invalid Date';
        
        if (format === 'short') {
            return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        } else if (format === 'long') {
            return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        } else if (format === 'datetime') {
            return d.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' });
        }
        
        return d.toLocaleDateString();
    }

    // Get seasonal limit based on current date
    getSeasonalLimit(seasonalConfig) {
        if (!seasonalConfig) return null;
        
        for (const seasonKey in seasonalConfig) {
            const season = seasonalConfig[seasonKey];
            if (this.isDateInSeasonalRange(season)) {
                return season.limit;
            }
        }
        
        return null;
    }
}

// Create and export singleton instance
const dateManager = new DateManager();

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = dateManager;
}
